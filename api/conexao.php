<?php
$host = "aws-0-sa-east-1.pooler.supabase.com";
$port = "6543";
$dbname = "postgres";
$user = "postgres.iavurvzpfgpihsfadmmx";
$password = "grupojfimoveis/";

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    echo "Erro na conexão.";
} else {
    echo "Conexão bem-sucedida!";
}
?>
