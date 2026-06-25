import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';
import { sendContactEmail, sendSellRequestEmail } from '@/lib/email';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change_me';

const json = (data, init = {}) => NextResponse.json(data, init);
const err = (msg, status = 400) => NextResponse.json({ error: msg }, { status });

const isAdmin = async () => {
  const c = await cookies();
  const tok = c.get('yanush_admin')?.value;
  return tok === ADMIN_SECRET;
};

const stripId = (doc) => {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return rest;
};

async function handler(request, ctx) {
  try {
    const { path = [] } = (await ctx.params) || {};
    const segs = Array.isArray(path) ? path : [path];
    const route = segs.join('/');
    const method = request.method;
    const db = await getDb();

    // Health
    if (route === '' || route === 'health') {
      return json({ ok: true, service: 'YANUSH Cars API' });
    }

    // ---- AUTH ----
    if (route === 'admin/login' && method === 'POST') {
      const body = await request.json();
      if (body.username === ADMIN_USER && body.password === ADMIN_PASS) {
        const res = json({ success: true });
        res.cookies.set('yanush_admin', ADMIN_SECRET, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        });
        return res;
      }
      return err('Invalid credentials', 401);
    }

    if (route === 'admin/logout' && method === 'POST') {
      const res = json({ success: true });
      res.cookies.set('yanush_admin', '', { path: '/', maxAge: 0 });
      return res;
    }

    if (route === 'admin/me' && method === 'GET') {
      return json({ authenticated: await isAdmin() });
    }

    // ---- CARS (public listing) ----
    if (route === 'cars' && method === 'GET') {
      const url = new URL(request.url);
      const limit = parseInt(url.searchParams.get('limit') || '0', 10);
      const cursor = db.collection('cars').find({}).sort({ createdAt: -1 });
      if (limit > 0) cursor.limit(limit);
      const docs = await cursor.toArray();
      return json(docs.map(stripId));
    }

    if (route.startsWith('cars/') && segs.length === 2 && method === 'GET') {
      const id = segs[1];
      const doc = await db.collection('cars').findOne({ id });
      if (!doc) return err('Not found', 404);
      return json(stripId(doc));
    }

    // ---- CARS (admin write) ----
    if (route === 'admin/cars' && method === 'POST') {
      if (!(await isAdmin())) return err('Unauthorized', 401);
      const body = await request.json();
      const car = {
        id: uuidv4(),
        brand: String(body.brand || '').trim(),
        model: String(body.model || '').trim(),
        year: parseInt(body.year, 10) || new Date().getFullYear(),
        price: parseInt(body.price, 10) || 0,
        mileage: parseInt(body.mileage, 10) || 0,
        fuel: String(body.fuel || 'Benzine'),
        gearbox: String(body.gearbox || 'Manueel'),
        description: String(body.description || ''),
        images: Array.isArray(body.images) ? body.images : [],
        createdAt: new Date().toISOString(),
      };
      await db.collection('cars').insertOne(car);
      return json(stripId(car));
    }

    if (route.startsWith('admin/cars/') && segs.length === 3 && method === 'PUT') {
      if (!(await isAdmin())) return err('Unauthorized', 401);
      const id = segs[2];
      const body = await request.json();
      const update = {};
      ['brand', 'model', 'fuel', 'gearbox', 'description'].forEach((k) => {
        if (body[k] !== undefined) update[k] = String(body[k]);
      });
      ['year', 'price', 'mileage'].forEach((k) => {
        if (body[k] !== undefined) update[k] = parseInt(body[k], 10) || 0;
      });
      if (Array.isArray(body.images)) update.images = body.images;
      await db.collection('cars').updateOne({ id }, { $set: update });
      const doc = await db.collection('cars').findOne({ id });
      return json(stripId(doc));
    }

    if (route.startsWith('admin/cars/') && segs.length === 3 && method === 'DELETE') {
      if (!(await isAdmin())) return err('Unauthorized', 401);
      const id = segs[2];
      await db.collection('cars').deleteOne({ id });
      return json({ success: true });
    }

    // ---- SELL REQUESTS ----
    if (route === 'sell-requests' && method === 'POST') {
      const body = await request.json();
      const sr = {
        id: uuidv4(),
        name: String(body.name || '').trim(),
        phone: String(body.phone || '').trim(),
        email: String(body.email || '').trim(),
        brand: String(body.brand || '').trim(),
        model: String(body.model || '').trim(),
        year: String(body.year || '').trim(),
        mileage: String(body.mileage || '').trim(),
        message: String(body.message || ''),
        images: Array.isArray(body.images) ? body.images : [],
        createdAt: new Date().toISOString(),
      };
      if (!sr.name || !sr.phone) return err('Name and phone required', 400);
      await db.collection('sell_requests').insertOne(sr);
      // Fire-and-forget email notification (non-blocking)
      sendSellRequestEmail(sr).catch((e) => console.error('sell email error:', e));
      return json({ success: true, id: sr.id });
    }

    if (route === 'admin/sell-requests' && method === 'GET') {
      if (!(await isAdmin())) return err('Unauthorized', 401);
      const docs = await db.collection('sell_requests').find({}).sort({ createdAt: -1 }).toArray();
      return json(docs.map(stripId));
    }

    if (route.startsWith('admin/sell-requests/') && segs.length === 3 && method === 'DELETE') {
      if (!(await isAdmin())) return err('Unauthorized', 401);
      const id = segs[2];
      await db.collection('sell_requests').deleteOne({ id });
      return json({ success: true });
    }

    // ---- CONTACT MESSAGES ----
    if (route === 'contact' && method === 'POST') {
      const body = await request.json();
      const msg = {
        id: uuidv4(),
        name: String(body.name || ''),
        email: String(body.email || ''),
        message: String(body.message || ''),
        createdAt: new Date().toISOString(),
      };
      await db.collection('contact_messages').insertOne(msg);
      // Fire-and-forget email notification (non-blocking)
      sendContactEmail(msg).catch((e) => console.error('contact email error:', e));
      return json({ success: true });
    }

    return err(`Not found: ${method} /${route}`, 404);
  } catch (e) {
    console.error('API error:', e);
    return err(e.message || 'Server error', 500);
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
