export type Restaurant = {
    name:string;
    category:string;
    address:Address;
    menu:Menu[];
}

export type Address = {
    city:string;
    detail:string;
    // "?" 와도 괜찮고 없어도 괜찮고, 근데 있어야 하는 상황에 체크가 안 되니 유의해야 함
    zipCode?:number;
};

export type Menu = {
    name:string;
    price:number;
    category:string;
}

// Omit = 빼고 만들어주세요
export type AddressWithoutZipCode = Omit<Address, 'zipCode'>