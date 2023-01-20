
// @ts-nocheck

export default {
    name: "player",
    title: "Player",
    type: "document",
    preview: {
        select: {
            title: "name",
            subtitle: "team",
            media: "profile",
        },
    },
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            description: "name of a player",
            validation: Rule => Rule.required().min(3).max(300).warning(
                "please provide a name for this player"
            )
        },
        {
            name: "profile",
            title: "Profile",
            type: "image",
            validation: rule => rule.required()
        },
        {
            name: "goals",
            title: "Goals",
            description: "Goals for a football player",
            type: "number"
        },
        {
            name: "assists",
            title: "Assists",
            description: "Assists for a football player",
            type: "number"
        },
        {
            name: "redCards",
            title: "Red Cards",
            description: "number of red cards for a football player",
            type: "number"
        },
        {
            name: "yellowCards",
            title: "Yellow Cards",
            description: "Yellow cards for a football player",
            type: "number"
        }

    ]
}