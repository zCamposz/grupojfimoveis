import fetch from "node-fetch";

export default async function handler(req, res) {
  // ID da planilha
  const SHEET_ID = "1Xq8suuHEH3j2KVDeCRJQ-Sd5jQDn2P_fzI82ntUjAJU";
  // Nome da aba
  const RANGE = "imoveis!A:J"; 
  // Sua API Key
  const API_KEY = "AIzaSyBTL4Da-8TZGr2KGyGlAwjwu4QQf4BIBOY";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Retorna os dados em JSON
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
}
