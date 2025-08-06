export type ImageType = {
    id: string,
    image_url: string,
    username: string,
    position: number,
}

export type UserType = {
    username: string,
    name: string | null,
    professional_title: string | null,
    cv_json: object | null,
    company_name: string | null,
    location: string | null,
    description: string | null,

    Image?: ImageType[],
}