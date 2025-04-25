export type TUser = {
    id: string;
    email: string;
    password?: string;
    themePref?: 'light' | 'dark';
}