// /api/sheets.js - Crie este arquivo na pasta /api do seu projeto

export default async function handler(req, res) {
    // Permitir apenas métodos GET
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const SHEET_ID = process.env.SHEET_ID;
        const API_KEY = process.env.GOOGLE_API_KEY;
        const RANGE = 'imoveis!A:J';

        if (!SHEET_ID || !API_KEY) {
            throw new Error('Variáveis de ambiente não configuradas');
        }

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.values || data.values.length <= 1) {
            return res.status(200).json({ properties: [] });
        }

        const headers = data.values[0];
        const rows = data.values.slice(1);
        
        const properties = rows.map((row, index) => ({
            id: row[0] || `prop_${index}`,
            name: row[1] || 'Sem nome',
            price: row[2] || '0',
            location: row[3] || 'Localização não informada',
            bedrooms: row[4] || '0',
            bathrooms: row[5] || '0',
            area: row[6] || '0',
            parking: row[7] || '0',
            image: row[8] || 'https://via.placeholder.com/800x400?text=Sem+Imagem',
            type: row[9] || 'Imóvel'
        }));

        // Configurar headers CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        // Cache por 5 minutos
        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

        return res.status(200).json({ 
            success: true,
            properties,
            count: properties.length 
        });
        
    } catch (error) {
        console.error('Erro na API:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Erro ao carregar dados da planilha',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno'
        });
    }
}