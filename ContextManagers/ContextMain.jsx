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
        'InputGroup',
        'InlineInputGroup'
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
        "Input Group": {
            "element": "InputGroup",
            "id": null,
            "parent": null,
            "order": null,
            "label": "Input Group",
        },
        "Inline Input Group": {
            "element": "InlineInputGroup",
            "id": null,
            "parent": null,
            "order": null,
            "label": "Inline Input Group",
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
        "Button To Section": {
            "element": "ButtonToSection",
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

    function switchOrder(id, direction) {
        let copy = {...elements()}
        let parent = copy[id].parent
        let order = copy[id].order
        if (direction === 'parent') {
            copy[id].parent = copy[parent].parent
            copy[id].order = Object.values(copy).filter(a => a.parent === copy[parent].parent).length
        }
        if (direction === 'up') {
            if (order > 1) {
                let replace = Object.values(copy).filter(a => a.parent === parent && a.order === order - 1)[0]
                copy[replace.id].order = order
                copy[id].order = order - 1
            }
        }
        if (direction === 'down') {
            if (order < Object.values(copy).filter(a => a.parent === parent).length) {
                let replace = Object.values(copy).filter(a => a.parent === parent && a.order === order + 1)[0]
                copy[replace.id].order = order
                copy[id].order = order + 1
            }
        }
        setElements(copy)
    }

    function deleteElement(id) {
        let copy = {...elements()}
        delete copy[id]
        for (let [key, value] of Object.entries(copy)) {
            if (value.parent === id) {
                delete copy[key]
            }
        }
        setElements(copy)
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

        let copyAllElements = {...elements()}

        const id = Math.max(0, ...Object.keys(elements()).map(key => parseInt(key, 10))) + 1

        copyAllElements[id] = {
            ...element,
            'id': id,
            'parent': parent.id,
            'order': Object.values(elements()).filter(a => a.parent === parent.id).length + 1
        }

        setElements(copyAllElements)

    }

    onMount(() => {

        let loadedElements = {}

        fArray.forEach(item => {
            loadedElements[item.id] = item
        });

        setElements(loadedElements)
    })

    createEffect(() => {
        if (activeSection()) {
            setEditElement({element: null})
        }
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
                addElement: addElement
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
