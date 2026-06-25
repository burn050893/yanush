#!/usr/bin/env python3
"""
Backend API tests for YANUSH Cars dealership website
Tests all endpoints at /app/app/api/[[...path]]/route.js
"""

import requests
import json
import sys

# Base URL from .env: NEXT_PUBLIC_BASE_URL
BASE_URL = "https://yanush-garage.preview.emergentagent.com/api"

# Admin credentials from .env
ADMIN_USER = "admin"
ADMIN_PASS = "Y@NushCars#2026!Lvg"

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "errors": []
}

def log_pass(test_name):
    """Log a passing test"""
    print(f"✅ PASS: {test_name}")
    test_results["passed"] += 1

def log_fail(test_name, reason):
    """Log a failing test"""
    print(f"❌ FAIL: {test_name}")
    print(f"   Reason: {reason}")
    test_results["failed"] += 1
    test_results["errors"].append(f"{test_name}: {reason}")

def check_no_mongo_id(data, test_name):
    """Verify no _id field in response"""
    if isinstance(data, dict):
        if "_id" in data:
            log_fail(test_name, f"Response contains MongoDB _id field: {data}")
            return False
    elif isinstance(data, list):
        for item in data:
            if isinstance(item, dict) and "_id" in item:
                log_fail(test_name, f"Response array contains MongoDB _id field in item: {item}")
                return False
    return True

print("=" * 80)
print("YANUSH Cars Backend API Tests")
print("=" * 80)
print(f"Base URL: {BASE_URL}")
print()

# ============================================================================
# TEST 1: Health endpoint
# ============================================================================
print("\n--- TEST 1: Health endpoint ---")
try:
    response = requests.get(f"{BASE_URL}")
    if response.status_code == 200:
        data = response.json()
        if data.get("ok") == True and data.get("service") == "YANUSH Cars API":
            log_pass("Health endpoint returns correct response")
        else:
            log_fail("Health endpoint", f"Unexpected response: {data}")
    else:
        log_fail("Health endpoint", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("Health endpoint", f"Exception: {str(e)}")

# ============================================================================
# TEST 2: Admin authentication flow
# ============================================================================
print("\n--- TEST 2: Admin authentication flow ---")

# Create a session to preserve cookies
session = requests.Session()

# 2a: GET /api/admin/me without cookie → {authenticated:false}
try:
    response = session.get(f"{BASE_URL}/admin/me")
    if response.status_code == 200:
        data = response.json()
        if data.get("authenticated") == False:
            log_pass("GET /admin/me without cookie returns authenticated:false")
        else:
            log_fail("GET /admin/me without cookie", f"Expected authenticated:false, got: {data}")
    else:
        log_fail("GET /admin/me without cookie", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("GET /admin/me without cookie", f"Exception: {str(e)}")

# 2b: POST /api/admin/login with WRONG creds → 401
try:
    response = session.post(f"{BASE_URL}/admin/login", json={"username": "wrong", "password": "wrong"})
    if response.status_code == 401:
        log_pass("POST /admin/login with wrong credentials returns 401")
    else:
        log_fail("POST /admin/login with wrong creds", f"Expected 401, got {response.status_code}: {response.text}")
except Exception as e:
    log_fail("POST /admin/login with wrong creds", f"Exception: {str(e)}")

# 2c: POST /api/admin/login with correct creds → 200, sets httpOnly cookie
try:
    response = session.post(f"{BASE_URL}/admin/login", json={"username": ADMIN_USER, "password": ADMIN_PASS})
    if response.status_code == 200:
        data = response.json()
        # Check if cookie was set
        if "yanush_admin" in session.cookies:
            log_pass("POST /admin/login with correct credentials returns 200 and sets cookie")
        else:
            log_fail("POST /admin/login cookie", f"Cookie 'yanush_admin' not set in session")
    else:
        log_fail("POST /admin/login with correct creds", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("POST /admin/login with correct creds", f"Exception: {str(e)}")

# 2d: GET /api/admin/me WITH cookie → {authenticated:true}
try:
    response = session.get(f"{BASE_URL}/admin/me")
    if response.status_code == 200:
        data = response.json()
        if data.get("authenticated") == True:
            log_pass("GET /admin/me with cookie returns authenticated:true")
        else:
            log_fail("GET /admin/me with cookie", f"Expected authenticated:true, got: {data}")
    else:
        log_fail("GET /admin/me with cookie", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("GET /admin/me with cookie", f"Exception: {str(e)}")

# ============================================================================
# TEST 3: Cars public endpoints
# ============================================================================
print("\n--- TEST 3: Cars public endpoints ---")

# 3a: GET /api/cars → returns array
try:
    response = requests.get(f"{BASE_URL}/cars")
    if response.status_code == 200:
        data = response.json()
        if isinstance(data, list):
            log_pass("GET /api/cars returns array")
            # Check no _id field
            if check_no_mongo_id(data, "GET /api/cars no _id check"):
                log_pass("GET /api/cars has no _id fields")
        else:
            log_fail("GET /api/cars", f"Expected array, got: {type(data)}")
    else:
        log_fail("GET /api/cars", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("GET /api/cars", f"Exception: {str(e)}")

# 3b: GET /api/cars?limit=3 → respects limit
try:
    response = requests.get(f"{BASE_URL}/cars?limit=3")
    if response.status_code == 200:
        data = response.json()
        if isinstance(data, list) and len(data) <= 3:
            log_pass("GET /api/cars?limit=3 respects limit")
        else:
            log_fail("GET /api/cars?limit=3", f"Expected array with ≤3 items, got {len(data)} items")
    else:
        log_fail("GET /api/cars?limit=3", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("GET /api/cars?limit=3", f"Exception: {str(e)}")

# ============================================================================
# TEST 4: Cars admin CRUD (protected)
# ============================================================================
print("\n--- TEST 4: Cars admin CRUD (protected) ---")

# 4a: POST /api/admin/cars WITHOUT auth cookie → 401
try:
    no_auth_session = requests.Session()
    response = no_auth_session.post(f"{BASE_URL}/admin/cars", json={
        "brand": "Test",
        "model": "Test",
        "year": 2020,
        "price": 10000,
        "mileage": 50000,
        "fuel": "Benzine",
        "gearbox": "Manueel",
        "description": "Test",
        "images": []
    })
    if response.status_code == 401:
        log_pass("POST /admin/cars without auth returns 401")
    else:
        log_fail("POST /admin/cars without auth", f"Expected 401, got {response.status_code}: {response.text}")
except Exception as e:
    log_fail("POST /admin/cars without auth", f"Exception: {str(e)}")

# 4b: Login as admin, then POST /api/admin/cars → 200, returns car with uuid id
created_car_id = None
try:
    # Use the session that already has the admin cookie
    response = session.post(f"{BASE_URL}/admin/cars", json={
        "brand": "Mercedes-Benz",
        "model": "C220d AMG Line",
        "year": 2021,
        "price": 34500,
        "mileage": 62000,
        "fuel": "Diesel",
        "gearbox": "Automaat",
        "description": "Test car",
        "images": ["data:image/png;base64,iVBORw0KGgo="]
    })
    if response.status_code == 200:
        data = response.json()
        if "id" in data and "_id" not in data:
            created_car_id = data["id"]
            log_pass("POST /admin/cars with auth creates car with uuid id (no _id)")
        else:
            log_fail("POST /admin/cars", f"Response missing 'id' or contains '_id': {data}")
    else:
        log_fail("POST /admin/cars with auth", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("POST /admin/cars with auth", f"Exception: {str(e)}")

# 4c: GET /api/cars → should now include the created car
if created_car_id:
    try:
        response = requests.get(f"{BASE_URL}/cars")
        if response.status_code == 200:
            data = response.json()
            car_ids = [car.get("id") for car in data if isinstance(car, dict)]
            if created_car_id in car_ids:
                log_pass("GET /api/cars includes newly created car")
            else:
                log_fail("GET /api/cars after create", f"Created car {created_car_id} not found in list")
        else:
            log_fail("GET /api/cars after create", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("GET /api/cars after create", f"Exception: {str(e)}")

# 4d: GET /api/cars/{id} → returns that single car (no _id)
if created_car_id:
    try:
        response = requests.get(f"{BASE_URL}/cars/{created_car_id}")
        if response.status_code == 200:
            data = response.json()
            if data.get("id") == created_car_id and "_id" not in data:
                log_pass(f"GET /api/cars/{created_car_id} returns car without _id")
            else:
                log_fail(f"GET /api/cars/{created_car_id}", f"Unexpected response: {data}")
        else:
            log_fail(f"GET /api/cars/{created_car_id}", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail(f"GET /api/cars/{created_car_id}", f"Exception: {str(e)}")

# 4e: PUT /api/admin/cars/{id} with {price:32000} → 200, returns updated car
if created_car_id:
    try:
        response = session.put(f"{BASE_URL}/admin/cars/{created_car_id}", json={"price": 32000})
        if response.status_code == 200:
            data = response.json()
            if data.get("price") == 32000 and "_id" not in data:
                log_pass(f"PUT /admin/cars/{created_car_id} updates price successfully")
            else:
                log_fail(f"PUT /admin/cars/{created_car_id}", f"Price not updated or _id present: {data}")
        else:
            log_fail(f"PUT /admin/cars/{created_car_id}", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail(f"PUT /admin/cars/{created_car_id}", f"Exception: {str(e)}")

# 4f: DELETE /api/admin/cars/{id} → 200
if created_car_id:
    try:
        response = session.delete(f"{BASE_URL}/admin/cars/{created_car_id}")
        if response.status_code == 200:
            log_pass(f"DELETE /admin/cars/{created_car_id} returns 200")
        else:
            log_fail(f"DELETE /admin/cars/{created_car_id}", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail(f"DELETE /admin/cars/{created_car_id}", f"Exception: {str(e)}")

# 4g: GET /api/cars/{id} after delete → 404
if created_car_id:
    try:
        response = requests.get(f"{BASE_URL}/cars/{created_car_id}")
        if response.status_code == 404:
            log_pass(f"GET /api/cars/{created_car_id} after delete returns 404")
        else:
            log_fail(f"GET /api/cars/{created_car_id} after delete", f"Expected 404, got {response.status_code}: {response.text}")
    except Exception as e:
        log_fail(f"GET /api/cars/{created_car_id} after delete", f"Exception: {str(e)}")

# ============================================================================
# TEST 5: Sell requests
# ============================================================================
print("\n--- TEST 5: Sell requests ---")

# 5a: POST /api/sell-requests with valid body → 200
created_sell_request_id = None
try:
    response = requests.post(f"{BASE_URL}/sell-requests", json={
        "name": "Jan Janssen",
        "phone": "+32 470 12 34 56",
        "email": "jan@test.be",
        "brand": "BMW",
        "model": "320d",
        "year": "2018",
        "mileage": "120000",
        "message": "In nette staat",
        "images": []
    })
    if response.status_code == 200:
        data = response.json()
        if data.get("success") == True and "id" in data:
            created_sell_request_id = data["id"]
            log_pass("POST /api/sell-requests with valid data returns success")
        else:
            log_fail("POST /api/sell-requests", f"Unexpected response: {data}")
    else:
        log_fail("POST /api/sell-requests", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("POST /api/sell-requests", f"Exception: {str(e)}")

# 5b: POST /api/sell-requests WITHOUT name → 400
try:
    response = requests.post(f"{BASE_URL}/sell-requests", json={
        "phone": "+32 470 12 34 56",
        "email": "test@test.be"
    })
    if response.status_code == 400:
        log_pass("POST /api/sell-requests without name returns 400")
    else:
        log_fail("POST /api/sell-requests without name", f"Expected 400, got {response.status_code}: {response.text}")
except Exception as e:
    log_fail("POST /api/sell-requests without name", f"Exception: {str(e)}")

# 5c: POST /api/sell-requests WITHOUT phone → 400
try:
    response = requests.post(f"{BASE_URL}/sell-requests", json={
        "name": "Test User",
        "email": "test@test.be"
    })
    if response.status_code == 400:
        log_pass("POST /api/sell-requests without phone returns 400")
    else:
        log_fail("POST /api/sell-requests without phone", f"Expected 400, got {response.status_code}: {response.text}")
except Exception as e:
    log_fail("POST /api/sell-requests without phone", f"Exception: {str(e)}")

# 5d: GET /api/admin/sell-requests WITHOUT cookie → 401
try:
    no_auth_session = requests.Session()
    response = no_auth_session.get(f"{BASE_URL}/admin/sell-requests")
    if response.status_code == 401:
        log_pass("GET /admin/sell-requests without auth returns 401")
    else:
        log_fail("GET /admin/sell-requests without auth", f"Expected 401, got {response.status_code}: {response.text}")
except Exception as e:
    log_fail("GET /admin/sell-requests without auth", f"Exception: {str(e)}")

# 5e: Login, then GET /api/admin/sell-requests → array containing the created request
if created_sell_request_id:
    try:
        response = session.get(f"{BASE_URL}/admin/sell-requests")
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                request_ids = [req.get("id") for req in data if isinstance(req, dict)]
                if created_sell_request_id in request_ids:
                    log_pass("GET /admin/sell-requests returns created request")
                    # Check no _id
                    if check_no_mongo_id(data, "GET /admin/sell-requests no _id check"):
                        log_pass("GET /admin/sell-requests has no _id fields")
                else:
                    log_fail("GET /admin/sell-requests", f"Created request {created_sell_request_id} not found")
            else:
                log_fail("GET /admin/sell-requests", f"Expected array, got: {type(data)}")
        else:
            log_fail("GET /admin/sell-requests", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("GET /admin/sell-requests", f"Exception: {str(e)}")

# 5f: DELETE /api/admin/sell-requests/{id} (with auth) → 200
if created_sell_request_id:
    try:
        response = session.delete(f"{BASE_URL}/admin/sell-requests/{created_sell_request_id}")
        if response.status_code == 200:
            log_pass(f"DELETE /admin/sell-requests/{created_sell_request_id} returns 200")
        else:
            log_fail(f"DELETE /admin/sell-requests/{created_sell_request_id}", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail(f"DELETE /admin/sell-requests/{created_sell_request_id}", f"Exception: {str(e)}")

# ============================================================================
# TEST 6: Contact form
# ============================================================================
print("\n--- TEST 6: Contact form ---")

try:
    response = requests.post(f"{BASE_URL}/contact", json={
        "name": "Test",
        "email": "t@t.be",
        "message": "Hello"
    })
    if response.status_code == 200:
        data = response.json()
        if data.get("success") == True:
            log_pass("POST /api/contact returns success")
        else:
            log_fail("POST /api/contact", f"Unexpected response: {data}")
    else:
        log_fail("POST /api/contact", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("POST /api/contact", f"Exception: {str(e)}")

# ============================================================================
# TEST 7: Edge cases
# ============================================================================
print("\n--- TEST 7: Edge cases ---")

# 7a: GET /api/nonexistent → 404
try:
    response = requests.get(f"{BASE_URL}/nonexistent")
    if response.status_code == 404:
        data = response.json()
        if "error" in data:
            log_pass("GET /api/nonexistent returns 404 with error message")
        else:
            log_fail("GET /api/nonexistent", f"404 but no error message: {data}")
    else:
        log_fail("GET /api/nonexistent", f"Expected 404, got {response.status_code}: {response.text}")
except Exception as e:
    log_fail("GET /api/nonexistent", f"Exception: {str(e)}")

# ============================================================================
# TEST 8: Admin logout
# ============================================================================
print("\n--- TEST 8: Admin logout ---")

try:
    response = session.post(f"{BASE_URL}/admin/logout")
    if response.status_code == 200:
        log_pass("POST /admin/logout returns 200")
        # Verify cookie is cleared by checking /admin/me
        response = session.get(f"{BASE_URL}/admin/me")
        if response.status_code == 200:
            data = response.json()
            if data.get("authenticated") == False:
                log_pass("After logout, GET /admin/me returns authenticated:false")
            else:
                log_fail("After logout check", f"Expected authenticated:false, got: {data}")
        else:
            log_fail("After logout check", f"Status {response.status_code}: {response.text}")
    else:
        log_fail("POST /admin/logout", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("POST /admin/logout", f"Exception: {str(e)}")

# ============================================================================
# SUMMARY
# ============================================================================
print("\n" + "=" * 80)
print("TEST SUMMARY")
print("=" * 80)
print(f"✅ Passed: {test_results['passed']}")
print(f"❌ Failed: {test_results['failed']}")
print(f"Total: {test_results['passed'] + test_results['failed']}")

if test_results['failed'] > 0:
    print("\n❌ FAILED TESTS:")
    for error in test_results['errors']:
        print(f"  - {error}")
    sys.exit(1)
else:
    print("\n🎉 All tests passed!")
    sys.exit(0)
