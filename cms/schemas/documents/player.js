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
    groups: [
        {
            title: "Player Info",
            name: "playerInfo",
            options: { collapsible: true }
        },
        {
            title: "General Stats",
            name: "generalStats",
            options: { collapsible: true }
        },
        {
            title: "Football Player Stats",
            name: "footballPlayerStats",
            options: { collapsible: true }
        },
        {
            title: "Basketball Player Stats",
            name: "basketballPlayerStats",
            options: { collapsible: true }
        }
    ],
    fields: [

        // player info
        {
            name: "name",
            title: "Name",
            type: "string",
            description: "name of a player",
            validation: Rule => Rule.required().min(3).max(300).warning(
                "please provide a name for this player"
            ),
            group: "playerInfo"
        },
        {
            name: "profile",
            title: "Profile",
            type: "image",
            group: "playerInfo"
        },
        {
            name: "assists",
            title: "Assists",
            description: "Assists for a basketball player",
            type: "number",
            group: "generalStats"
        },
        // football 
        {
            name: "position",
            title: "Position",
            description: "Position of a football player",
            type: "string",
            group: "footballPlayerStats"
        },
        {
            name: "goals",
            title: "Goals",
            description: "Goals for a football player",
            type: "number",
            group: "footballPlayerStats"
        },
        {
            name: "redCards",
            title: "Red Cards",
            description: "number of red cards for a football player",
            type: "number",
            group: "footballPlayerStats"
        },
        {
            name: "yellowCards",
            title: "Yellow Cards",
            description: "Yellow cards for a football player",
            type: "number",
            group: "footballPlayerStats"
        },

        // basketball
        {
            name: "points",
            title: "Points",
            description: "Points for a basketball player",
            type: "number",
            group: "basketballPlayerStats"
        },
        {
            name: "rebounds",
            title: "Rebounds",
            description: "Rebounds for a basketball player",
            type: "number",
            group: "basketballPlayerStats"
        },

        {
            name: "steals",
            title: "Steals",
            description: "Steals for a basketball player",
            type: "number",
            group: "basketballPlayerStats"
        },
        {
            name: "blocks",
            title: "Blocks",
            description: "Blocks for a basketball player",
            type: "number",
            group: "basketballPlayerStats"
        }
    ]
}