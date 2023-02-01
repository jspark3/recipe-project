export class Recipe{
    public name: string;
    public descrtiption: string;
    public imagePath: string;

    constructor(name: string, desc: string, imagePath: string)
    {
        this.name = name;
        this.descrtiption = desc;
        this.imagePath = imagePath;
    }
}