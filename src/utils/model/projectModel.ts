export interface IProjectInterface {
    id: number;
    src: string;
    title: string;
    type: string;
    content: React.ReactNode;
    tags: string[];
    url?: string;
}

export class Project {
    readonly #id: number;
    readonly #src: string;
    readonly #title: string;
    readonly #type: string;
    readonly #content: React.ReactNode;
    readonly #tags: string[];
    readonly #url?: string;

    constructor(
        id: number,
        src: string,
        title: string,
        type: string,
        content: React.ReactNode,
        tags: string[],
        url?: string
    ) {
        this.#id = id;
        this.#src = src;
        this.#title = title;
        this.#type = type;
        this.#content = content;
        this.#tags = tags;
        this.#url = url;
    }

    get id(): number {
        return this.#id;
    }

    get src(): string {
        return this.#src;
    }

    get title(): string {
        return this.#title;
    }

    get type(): string {
        return this.#type;
    }

    get content(): React.ReactNode {
        return this.#content;
    }

    get tags(): string[] {
        return this.#tags;
    }

    get url(): string | undefined {
        return this.#url;
    }

}
