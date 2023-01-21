export default {
    name: "team",
    title: "Team",
    type: "document",
    preview: {
        select: {
            title: "name",
            subtitlle: "category.name",
            media: "logo",
        }
    },
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            description: "The team name . ex : Y2-Football",
            validation: Rule => Rule.required().min(3).max(300).warning(
                "please provide a name for this team"
            )
        },
        {
            name: "logo",
            title: "Logo",
            type: "image",
            validation: rule => rule.required()
        },
        {
            name: "players",
            title: "Players",
            type: "array",
            of: [{ type: "reference", to: { type: "player" } }],
            validation: rule => rule.required()
        },
        // category
        {
            name: "category",
            title: "Category",
            type: "reference",
            description: "The category where the team belongs to. ex : football, basketball, ...",
            to: [{ type: "category" }],
            validation: rule => rule.required()
        },
    ]
}