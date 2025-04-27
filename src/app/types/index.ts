export type TUser = {
    id: string;
    email: string;
    name: string
    password?: string;
    themePref?: 'light' | 'dark';
}