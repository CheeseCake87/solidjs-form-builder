import {createContext, createEffect, createSignal, onMount, Show} from 'solid-js'
import {Outlet, useNavigate} from '@solidjs/router'
import {fArray} from "../external";


export const ContextMain = createContext()

export function MainContextProvider() {

    let deBouncer = null

    const navigator = useNavigate()

    const [building, setBuilding] = createSignal(true)
    const [refresh, setRefresh] = createSignal(false)

    const parentElements = [
        'Section',
        'Group',
    ]

    const [activeSection, setActiveSection] = createSignal(null)

    const [elementLib, _] = createSignal({
        "Section": {
            "element": "Section",
            "id": null,
            "parent": null,
            "order": null,
            "label": "Section",
        },
        "Group": {
            "element": "Group",
            "id": null,
            "parent": null,
            "order": null,
            "label": "Group",
            "style": "column"
        },
        "Input Text": {
            "element": "InputText",
            "id": null,
            "parent": null,
            "order": null,
            "label": "Label",
            "type": "text",
            "value": "",
            "default_value": "",
            "match_field": [
                "source_field",
                "first_name",
                "last_name",
            ]
        },
        "Input Number": {
            "element": "InputNumber",
            "id": null,
            "parent": null,
            "order": null,
            "label": "Label",
            "type": "number",
            "value": "",
            "default_value": "",
            "match_field": [
                "number_of_dependents",
            ]
        },
        "Button Goto Section": {
            "element": "ButtonGotoSection",
            "id": null,
            "parent": null,
            "order": null,
            "label": "Button",
            "section": null
        }
    })
    const [elements, setElements] = createSignal()

    const [editElement, setEditElement] = createSignal({element: null})
    const [addElementTo, setAddElementTo] = createSignal(null)

    const [sections, setSections] = createSignal()
    const [groups, setGroups] = createSignal()

    function updateValue(id, value) {
        let copy = {...elements()}
        copy[id].value = value
        setElements(copy)
    }

    function updateAttribute(id, attr, value) {
        if (deBouncer) {
            clearTimeout(deBouncer)
        }
        deBouncer = setTimeout(() => {
            let copy = {...elements()}
            copy[id][attr] = value
            setElements(copy)
        }, 500)
    }

    function updateElement(id, values) {
        let copyElement = {...elements()[id], ...values}
        let copyElements = {...elements()}
        copyElements[id] = copyElement
        setElements(copyElements)
    }

    // TODO: fix the visual feedback on the buttons to switch order of elements

    function switchOrder(id, direction) {
        let copyAllElements = {...elements()}
        let parent = copyAllElements[id].parent
        let currentOrder = copyAllElements[id].order

        if (direction === 'parent') {
            copyAllElements[id].parent = copyAllElements[parent].parent
            copyAllElements[id].order = Object.values(
                copyAllElements).filter(a => a.parent === copyAllElements[parent].parent).length
        }

        if (direction === 'up') {
            // check if the current order is more than 1, if not do not continue
            if (currentOrder > 1) {
                // find the element to swap order values with
                const findReplacement = Object.values(
                    copyAllElements).filter(a => a.parent === parent && a.order === currentOrder - 1)

                // if replacement found switch orders
                if (findReplacement) {

                    const replace = findReplacement[0]

                    copyAllElements[replace.id].order = currentOrder
                    copyAllElements[id].order = currentOrder - 1

                    setElements(copyAllElements)
                }
            }
        }

        if (direction === 'down') {
            if (currentOrder < Object.values(copyAllElements).filter(a => a.parent === parent).length) {

                const findReplacement = Object.values(
                    copyAllElements).filter(a => a.parent === parent && a.order === currentOrder + 1)

                if (findReplacement) {

                    const replace = findReplacement[0]

                    copyAllElements[replace.id].order = currentOrder
                    copyAllElements[id].order = currentOrder + 1

                    setElements(copyAllElements)
                }
            }
        }


    }

    function deleteElement(id) {

        // make a copy of the current elements
        let copyAllElements = {...elements()}

        if (parentElements.includes(copyAllElements[id].element)) {

            // if the element is classed as a parent element, delete its child elements
            for (let [key, value] of Object.entries(copyAllElements)) {
                if (value.parent === id) {
                    delete copyAllElements[key]
                }
            }

            // finally, delete the element
            delete copyAllElements[id]

        } else {

            // delete the element
            delete copyAllElements[id]

            // set the new child element count
            copyAllElements[parent.id] = {
                '_childElementCount': countChildElements(parent.id, copyAllElements),
            }

        }

        // save the changes
        setElements(copyAllElements)

        if (id === activeSection()) {
            setActiveSection(1)
        }

    }

    function addSection() {

        let copyAllElements = {...elements()}

        const id = Math.max(0, ...Object.keys(elements()).map(key => parseInt(key, 10))) + 1

        copyAllElements[id] = {
            element: 'Section',
            id: id,
            parent: 0,
            order: Object.values(elements()).filter(a => a.parent === 0).length + 1,
            label: 'New Section'
        }

        setActiveSection(id)
        setElements(copyAllElements)

    }

    function addElement(parent, element) {

        // make a copy of the current elements
        let copyAllElements = {...elements()}

        // generate a new id for the new element being added
        const id = Math.max(
            0, ...Object.keys(
                copyAllElements
            ).map(
                key => parseInt(key, 10)
            )
        ) + 1

        copyAllElements[id] = {
            ...element,
            'id': id,
            'parent': parent.id,
            'order': Object.values(copyAllElements).filter(a => a.parent === parent.id).length + 1
        }

        copyAllElements[parent.id] = {
            ...copyAllElements[parent.id],
            '_childElementCount': countChildElements(parent.id, copyAllElements),
        }

        console.log(elements())
        console.log(copyAllElements)

        setElements(copyAllElements)

    }

    function countChildElements(parentId, ArrayOfElements) {
        let count = 0;
        for (let key in ArrayOfElements) {
            if (ArrayOfElements[key].parent === parentId) {
                count++;
            }
        }
        return count;
    }

    onMount(() => {

        let loadedElements = {}

        fArray.forEach(item => {
            if (parentElements.includes(item.element)) {
                loadedElements[item.id] = {
                    ...item,
                    _childElementCount: countChildElements(item.id, fArray)
                };
            } else {
                loadedElements[item.id] = item
            }
        });

        setElements(loadedElements)

    })

    createEffect(() => {
        if (activeSection()) {
            setEditElement({element: null})
        }
    })

    createEffect(() => {
        setSections(
            Object.values(elements())
                .filter(a => a.element === 'Section')
                .sort((a, b) => a.order - b.order)
        )
    })

    return (
        <ContextMain.Provider value={
            {
                parentElements: parentElements,
                refresh: refresh,
                setRefresh: setRefresh,
                navigator: navigator,
                elementLib: elementLib,
                addElementTo: addElementTo,
                setAddElementTo: setAddElementTo,
                editElement: editElement,
                setEditElement: setEditElement,
                elements: elements,
                setElements: setElements,
                sections: sections,
                setSections: setSections,
                building: building,
                setBuilding: setBuilding,
                activeSection: activeSection,
                setActiveSection: setActiveSection,
                deleteElement: deleteElement,
                switchOrder: switchOrder,
                updateValue: updateValue,
                updateAttribute: updateAttribute,
                updateElement: updateElement,
                addSection: addSection,
                addElement: addElement,
                countChildElements: countChildElements,
            }
        }>
            <div className={'main-container'}>
                <div className={'main-content'}>
                    <Show when={elements()} fallback={'Loading'}>
                        <Outlet/>
                    </Show>
                </div>
            </div>
        </ContextMain.Provider>
    )
}
