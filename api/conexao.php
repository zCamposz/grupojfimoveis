<?php
$host = "db.iavurvzpfgpihsfadmmx.supabase.co"; // ex: db.xxxxxxxxx.supabase.co
$port = "5432";
$dbname = "postgres"; // Nome padrão do banco
$user = "postgres";   // Usuário padrão
$password = "Ga29164476";

// String de conexão
$conn_string = "host=$host port=$port dbname=$dbname user=$user password=$password sslmode=require";

// Conectar
$conn = pg_connect($conn_string);

// Verificar conexão
if (!$conn) {
    die("Erro ao conectar ao banco de dados PostgreSQL no Supabase.");
}

// echo "Conexão bem-sucedida!";
?>
