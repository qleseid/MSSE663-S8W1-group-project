export class recipe {
    title: string;
    tags?: Tag[];
    knownAllergens?: Allergen[];
    prepTime?: number[]; // [hours, minutes]
    cookTime?: number[]; // [hours, minutes]
    // total time inferred, prep time + cook time
    ingredients: string[];
    steps: string[];
    story?: string;
    comments?: string;
}

export enum Tag {
    GlutenFree,
    DairyFree,
    Vegan,
    Vegetarian,
    Pescatarian,
    Sattvic,
    Halal,
    KosherPareve,
    KosherDairy,
    KosherMeat,
    KosherNeutral,
    NutFree
}

export enum Allergen {
    nuts,
    treeNuts,
    eggs,
    dairy,
    coconut,
    cherry
}
