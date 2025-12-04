async function handler(req, res) {
  const response = await fetch('http://localhost:8000/getMountains', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  res.json(data);
}

export default handler;
