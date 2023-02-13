export type Section = {
    title: String,
    monsters: MonsterData[]
}
export type MonsterData = {
    id: number;
    text: string;
    img: string;
    name: string;
    available: boolean;
    phylum: string;
    free: boolean;
    fought?: boolean;
};

export type RelayData = {
    sections: Section[],
    phylum: string,
    locketMonsters: string[],
    availableMonsters: { [key: number]: MonsterData },
    pwd: string
}