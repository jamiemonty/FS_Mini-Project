export async function listUsers() {
  const response = await fetch('/api/get-users');
  return { data: await response.json() };
}

export async function deleteUser(id) {
  const response = await fetch('/api/delete-user', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: { 'Content-Type': 'application/json' }
  });
  return { data: await response.json() };
}

export async function getUser(id) {
  const response = await fetch('/api/get-user', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: { 'Content-Type': 'application/json' }
  });
  return { data: await response.json() };
}

export async function createUser(user) {
  const response = await fetch('/api/create-user', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' }
  });
  return { data: await response.json() };
}

export async function updateUser(id, user) {
  const response = await fetch('/api/update-user', {
    method: 'POST',
    body: JSON.stringify({ id, ...user }),
    headers: { 'Content-Type': 'application/json' }
  });
  return { data: await response.json() };
}
