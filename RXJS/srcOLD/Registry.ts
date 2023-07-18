export interface Registry {
    name: string;
    value: number;
}

const MakeRegistryField = (size: number) => (
    (sizeOfField: number) =>
    {
        const registries = new Map<string, Registry>();
        for (let i = 0; i < size; i++) {
            registries.set(`R${i}`, {name: `R${i}`, value: 0});
        }
        return registries;
    }
)(size);

export const registryField = MakeRegistryField(10);