export interface Service {
    code: string;
    name: string;
    children?: Service[];
}
