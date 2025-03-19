export const fArray = [
    {
        "element": "Section",
        "id": 1,
        "parent": 0,
        "order": 1,
        "label": "Section",
    },
    {
        "element": "Header",
        "id": 3,
        "parent": 1,
        "order": 1,
        "text": "Header text"
    },
    {
        "element": "Header",
        "id": 12,
        "parent": 1,
        "order": 3,
        "text": "Header text 2"
    },
    {
        "element": "Text",
        "id": 4,
        "parent": 1,
        "order": 2,
        "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        "element": "Section",
        "id": 5,
        "parent": 0,
        "order": 2,
        "label": "Section",
    },
    {
        "element": "Group",
        "id": 6,
        "parent": 5,
        "order": 1,
        "label": "Group",
        "style": "column",
    },
    {
        "element": "Group",
        "id": 7,
        "parent": 5,
        "order": 2,
        "label": "Inline Group",
        "style": "row",
    },
    {
        "element": "InputText",
        "id": 8,
        "parent": 7,
        "order": 1,
        "label": "First Name",
        "type": "text",
        "value": "John",
        "required": true,
    },
    {
        "element": "InputText",
        "id": 9,
        "parent": 7,
        "order": 2,
        "label": "Last Name",
        "type": "text",
        "required": true,
    },
    {
        "element": "InputText",
        "id": 10,
        "parent": 6,
        "order": 1,
        "label": "Label",
        "type": "text",
        "required": false,
    },
    {
        "element": "ButtonGotoSection",
        "id": 11,
        "parent": 6,
        "order": 2,
        "goto_section": 1,
        "label": "Button"
    }
]


// export const fMap = {
//     1: {
//         "element": "Section",
//         "id": 1,
//         "parent": 0,
//         "order": 1,
//     },
//     3: {
//         "element": "Header",
//         "id": 3,
//         "parent": 1,
//         "order": 1,
//         "text": "Header text"
//     },
//     4: {
//         "element": "Text",
//         "id": 4,
//         "parent": 1,
//         "order": 2,
//         "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//     },
//     5: {
//         "element": "Section",
//         "id": 5,
//         "parent": 0,
//         "order": 2,
//     },
//     6: {
//         "element": "Group",
//         "id": 6,
//         "parent": 5,
//         "order": 1,
//         "style": "column",
//     },
//     7: {
//         "element": "Group",
//         "id": 7,
//         "parent": 6,
//         "order": 1,
//         "style": "row",
//     },
//     8: {
//         "element": "InputText",
//         "id": 8,
//         "parent": 7,
//         "order": 1,
//         "label": "First Name",
//         "type": "text",
//         "value": "John"
//     },
//     9: {
//         "element": "InputText",
//         "id": 9,
//         "parent": 7,
//         "order": 2,
//         "label": "Last Name",
//         "type": "text"
//     },
//     10: {
//         "element": "InputText",
//         "id": 10,
//         "parent": 6,
//         "order": 2,
//         "label": "Label",
//         "type": "text"
//     },
//     11: {
//         "element": "ButtonGotoSection",
//         "id": 11,
//         "parent": 6,
//         "order": 3,
//         "section": 1,
//         "label": "Button"
//     }
// }
