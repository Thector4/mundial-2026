export default async (request, context) => {
  const API_KEY = process.env.FOOTBALL_API_KEY;
  const API_URL = 'https://api.football-data.org/v4/competitions/2000/matches';

  try {
    const response = await fetch(API_URL, {
      headers: { 'X-Auth-Token': API_KEY }
    });

    if (!response.ok) {
      throw new Error(`Error de la API: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error en la función serverless:', error);
    return Response.json({ error: 'Error al obtener los partidos' }, { status: 500 });
  }
};