// @ts-nocheck

export default {
    name: "category",
    title: "Category",
    type: "document",
    preview: {
        select: {
            subtitle: "name",
        },
        prepare({ subtitle }) {
            return {
                title: "Category",
                subtitle: subtitle,
            }
        }
    },
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            description: "name of category (ex : football, basketball, ...)",
            validation: Rule => Rule.required().min(3).max(300).warning(
                "please provide a name for this Category"
            )
        },
    ]
}