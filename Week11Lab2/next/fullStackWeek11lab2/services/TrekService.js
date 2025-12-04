export async function listMountains() {
  const response = await fetch('/api/get-mountains');
  return { data: await response.json() };
}

export async function getMountains(mountainId) {
  const response = await fetch('/api/search-mountain', {
    method: 'POST',
    body: JSON.stringify({ mountainId }),
    headers: { 'Content-Type': 'application/json' }
  });
  return { data: await response.json() };
}
