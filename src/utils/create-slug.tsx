export function createSlug(username: string): string {
    return username
        .normalize("NFD") //Decompõe caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") //Remove os acentos
        .replace(/[^a-zA-Z0-9\s-]/g, "") //Remove caracteres especiais
        .replace(/\s+/g, "-") //Substitui espaços por hífens
        .replace(/-+/g, "-") //Substitui múltiplos hífens por um único hífen
        .toLowerCase() //Converte para minúsculas
        .trim(); //Remove espaços no início e no final
}