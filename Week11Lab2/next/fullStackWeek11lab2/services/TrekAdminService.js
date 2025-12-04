export async function listMountains() {
  const response = await fetch('/api/get-mountains');
  return { data: await response.json() };
}

export async function deleteMountain(id) {
  const response = await fetch('/api/delete-mountain', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: { 'Content-Type': 'application/json' }
  });
  return { data: await response.json() };
}

export async function getMountain(id) {
  const response = await fetch('/api/get-mountain', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: { 'Content-Type': 'application/json' }
  });
  return { data: await response.json() };
}

export async function createMountain(mountain) {
  const response = await fetch('/api/create-mountain', {
    method: 'POST',
    body: JSON.stringify(mountain),
    headers: { 'Content-Type': 'application/json' }
  });
  return { data: await response.json() };
}

export async function updateMountain(id, mountain) {
  const response = await fetch('/api/update-mountain', {
    method: 'POST',
    body: JSON.stringify({ id, ...mountain }),
    headers: { 'Content-Type': 'application/json' }
  });
  return { data: await response.json() };
}
