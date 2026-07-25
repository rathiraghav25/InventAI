from app.core.security import hash_password, verify_password

password = "inventai123"

hashed = hash_password(password)

print(hashed)

print(verify_password(password, hashed))