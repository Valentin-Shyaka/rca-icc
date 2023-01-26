export default {
    name: "trending",
    title: "Trending",
    type: "document",
    preview: {
        select: {
            subtitle: "text",
            media: "image"
        },
        prepare({ subtitle, media }) {
            return {
                title: "Trending",
                subtitle: subtitle ? `content : ${subtitle}` : "no text",
                media: media
            }
        }
    },
    fields: [
        {
            name: "image",
            title: "Image",
            type: "image",
            description: "the image for the trending",
        },
        {
            name: "text",
            title: "Text",
            type: "text",
            description: "the title of the trending",
            validation: Rule => Rule.required().min(3).max(300).warning(
                "please provide a title for the trending"
            )
        }
    ]

}