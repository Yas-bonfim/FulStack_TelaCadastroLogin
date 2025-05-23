export interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    publishedYear: number | undefined;
    status: 'Lido' | 'Lendo' | 'Quero ler';
}
