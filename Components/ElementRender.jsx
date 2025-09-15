import {createEffect, createSignal, For, Show, useContext} from "solid-js";
import {ContextMain} from "../ContextManagers/ContextMain";
import Up from "./Icons/Up";
import Down from "./Icons/Down";
import Edit from "./Icons/Edit";
import Add from "./Icons/Add";
import Id from "./Icons/Id";
import Order from "./Icons/Order";
import ChildElements from "./Icons/ChildElements";

function ElementMenu(props) {
    const ctxMain = useContext(ContextMain)

    return <div className={'flex gap-1 pb-4 w-full'}>

        <span className={'fb-icon-no-click text-xs font-bold flex align-middle gap-2'}>
            <Id size={14}/>
            {props.attrs.id}
        </span>

        <Show when={props.attrs._childElementCount > 0}>

            <span className={'fb-icon-no-click text-xs font-bold flex align-middle gap-2'}>
                <ChildElements size={14}/>
                {props.attrs._childElementCount}
            </span>

        </Show>

        <Show when={props.attrs.element !== 'Section'}>

        <span className={'fb-icon-no-click text-xs font-bold flex align-middle gap-2'}>
            <Order size={14}/>
            {ctxMain.elements()[props.attrs.id].order}
        </span>

        </Show>

        <span className={'fb-icon-no-click text-xs flex align-middle gap-2'}>
            {props.element}
        </span>

        {/* Edit */}

        <span
            className={'fb-icon'}
            onClick={() => {
                ctxMain.setAddElementTo(null)
                ctxMain.setEditElement({...props.attrs})
            }}
        ><Edit size={14}/></span>

        <Show when={props.attrs.element !== 'Section'}>

            {/* Move Up */}

            <span
                className={ctxMain.elements()[props.attrs.id].order < 2 ? 'fb-icon-disabled' : 'fb-icon'}
                onClick={() => {
                    if (ctxMain.elements()[props.attrs.id].order < 2) {
                        return null
                    }
                    ctxMain.switchOrder(props.attrs.id, 'up')
                }}
            ><Up size={14}/></span>

            {/* Move Down */}

            <span
                className={
                    ctxMain.elements()[props.attrs.id].order >= ctxMain.elements()[props.attrs.parent]._childElementCount
                        ? 'fb-icon-disabled'
                        : 'fb-icon'
                }
                onClick={() => ctxMain.switchOrder(props.attrs.id, 'down')}
            ><Down size={14}/></span>

        </Show>

        {/* Add */}

        <Show when={ctxMain.parentElements.includes(props.attrs.element)}>
            <span
                className={'fb-icon-good'}
                onClick={() => {
                    ctxMain.setEditElement({})
                    ctxMain.setAddElementTo(props.attrs.id)
                }}
            ><Add size={14}/></span>
        </Show>

    </div>
}

export function Section(props) {

    const ctxMain = useContext(ContextMain)

    return (
        <Show when={ctxMain.activeSection() === props.attrs.id}>
            <section className={ctxMain.building() ? 'fb-section-building' : 'fb-section'}>
                <Show when={ctxMain.building()}>
                    <ElementMenu element={`Section: ${props.attrs.label}`} attrs={props.attrs}/>
                </Show>
                <For each={
                    Object.values(ctxMain.elements())
                        .filter(a => a.parent === props.attrs.id)
                        .sort((a, b) => a.order - b.order)
                }>
                    {
                        (element, _) => <ElementRender attrs={element}/>
                    }
                </For>
            </section>
        </Show>
    )
}

export function Group(props) {

    const ctxMain = useContext(ContextMain)

    return (
        <section className={
            ctxMain.building()
                ? 'fb-group-building'
                : 'fb-group'
        }>
            <Show when={ctxMain.building()}>
                <ElementMenu element={'Group'} attrs={props.attrs}/>
            </Show>
            <div className={
                props.attrs.style === 'column' ?
                    'fb-group-column' : 'fb-group-row'
            }>
                <For each={
                    Object.values(ctxMain.elements())
                        .filter(a => a.parent === props.attrs.id)
                        .sort((a, b) => a.order - b.order)
                }>
                    {
                        (element, _) => <ElementRender attrs={element}/>
                    }
                </For>
            </div>
        </section>
    )
}

export function InlineGroup(props) {

    const ctxMain = useContext(ContextMain)

    const [childElements, setChildElements] = createSignal()

    createEffect(() => {
        setChildElements(
            Object.values(ctxMain.elements())
                .filter(a => a.parent === props.attrs.id)
                .sort((a, b) => a.order - b.order)
        )
    })

    return (
        <Show when={ctxMain.building()} fallback={
            <div className={'fb-inline-group'}>
                <For each={childElements()}>
                    {
                        (element, _) => <ElementRender attrs={element}/>
                    }
                </For>
            </div>
        }>
            <section className={'fb-inline-group-building'}>
                <div className={'flex flex-row gap-1 pb-2'}>
                    <ElementMenu element={'Inline Group'} attrs={props.attrs}/>
                </div>
                <div className={'fb-inline-group'}>
                    <For each={childElements()}>
                        {
                            (element, _) => <ElementRender attrs={element}/>
                        }
                    </For>
                </div>
            </section>
        </Show>
    )
}

export function Header(props) {

    const ctxMain = useContext(ContextMain)

    return (
        <Show when={ctxMain.building()} fallback={
            <div className={'fb-inline-group'}>
                <h1 className={'fb-header'}>{props.attrs.text}</h1>
            </div>
        }>
            <section className={'fb-header-building'}>
                <div className={'flex flex-row gap-1 pb-2'}>
                    <ElementMenu element={'Header'} attrs={props.attrs}/>
                </div>
                <h1 className={'fb-header'}>{ctxMain.elements()[props.attrs.id].text}</h1>
            </section>
        </Show>
    )
}

export function Text(props) {

    const ctxMain = useContext(ContextMain)

    return (
        <Show when={ctxMain.building()} fallback={
            <div className={'fb-inline-group'}>
                <p className={'fb-text'}>{props.attrs.text}</p>
            </div>
        }>
            <section className={'fb-text-building'}>
                <div className={'flex flex-row gap-1 pb-2'}>
                    <ElementMenu element={'Text'} attrs={props.attrs}/>
                </div>
                <p className={'fb-text'}>{ctxMain.elements()[props.attrs.id].text}</p>
            </section>
        </Show>
    )
}

export function ButtonGotoSection(props) {

    const ctxMain = useContext(ContextMain)

    return (
        <Show when={ctxMain.building()} fallback={
            <div>
                <button
                    className={'fb-button fb-button-confirm'}
                    onClick={() => {
                        ctxMain.setActiveSection(props.attrs.goto_section)
                    }}
                >
                    {props.attrs.label}
                </button>
            </div>
        }>
            <section className={'fb-button-building'}>
                <div className={'flex flex-row gap-1 pb-2'}>
                    <ElementMenu element={'Button Goto Section'} attrs={props.attrs}/>
                </div>
                <div>
                    <button
                        className={'fb-button fb-button-confirm'}
                        onClick={() => {
                            ctxMain.setActiveSection(props.attrs.goto_section)
                        }}
                    >
                        {props.attrs.label}
                    </button>
                </div>
            </section>
        </Show>
    )
}

export function InputText(props) {

    const ctxMain = useContext(ContextMain)

    console.log(props.attrs)

    return (
        <Show when={ctxMain.building()} fallback={
            <div className={'fb-input-group'}>
                <label className={'fb-label'} for={props.attrs.id}>{props.attrs.label}</label>
                <input className={'fb-input'}
                       type="text"
                       id={props.attrs.id}
                       name={props.attrs.id}
                       onKeyUp={
                           (e) => ctxMain.updateValue(props.attrs.id, e.target.value)
                       }
                       value={
                           props.attrs.value
                               ? props.attrs.value
                               : ''
                       }
                       required={props.attrs.required}
                />
            </div>
        }>
            <section className={'fb-input-building'}>
                <div className={'flex flex-row gap-1 pb-2'}>
                    <ElementMenu element={'Input Text'} attrs={props.attrs}/>
                </div>
                <div className={'fb-input-group'}>
                    <label
                        className={'fb-label'}
                        for={props.attrs.id}
                    >
                        {ctxMain.elements()[props.attrs.id].label}
                    </label>
                    <input className={'fb-input'}
                           type="text"
                           id={props.attrs.id}
                           name={props.attrs.id}
                           onKeyUp={
                               (e) => ctxMain.updateValue(props.attrs.id, e.target.value)
                           }
                           value={
                               ctxMain.elements()[props.attrs.id].default_value
                                   ? ctxMain.elements()[props.attrs.id].default_value
                                   : ''
                           }/>
                </div>
            </section>
        </Show>
    )
}

export function InputNumber(props) {

    const ctxMain = useContext(ContextMain)

    return (
        <Show when={ctxMain.building()} fallback={
            <div className={'fb-input-group'}>
                <label className={'fb-label'} for={props.attrs.id}>{props.attrs.label}</label>
                <input className={'fb-input'}
                       required={props.attrs.required}
                       type="number"
                       id={props.attrs.id}
                       name={props.attrs.id}
                       onKeyUp={
                           (e) => ctxMain.updateValue(props.attrs.id, e.target.value)
                       }
                       value={
                           props.attrs.value
                               ? props.attrs.value
                               : ''
                       }
                />
            </div>
        }>
            <section className={'fb-input-building'}>
                <div className={'flex flex-row gap-1 pb-2'}>
                    <ElementMenu element={'Input Number'} attrs={props.attrs}/>
                </div>
                <div className={'fb-input-group'}>
                    <label
                        className={'fb-label'}
                        for={props.attrs.id}
                    >
                        {ctxMain.elements()[props.attrs.id].label}
                    </label>
                    <input className={'fb-input'}
                           type="number"
                           id={props.attrs.id}
                           name={props.attrs.id}
                           onKeyUp={
                               (e) => ctxMain.updateValue(props.attrs.id, e.target.value)
                           }
                           value={
                               ctxMain.elements()[props.attrs.id].default_value
                                   ? ctxMain.elements()[props.attrs.id].default_value
                                   : ''
                           }/>
                </div>
            </section>
        </Show>
    )
}

export function ElementRender(props) {
    const e = props.attrs.element

    switch (e) {
        case "Section":
            return <Section attrs={props.attrs}/>
        case "Group":
            return <Group attrs={props.attrs}/>

        case "Header":
            return <Header attrs={props.attrs}/>
        case "Text":
            return <Text attrs={props.attrs}/>

        case "InputText":
            return <InputText attrs={props.attrs}/>
        case "InputNumber":
            return <InputNumber attrs={props.attrs}/>

        case "ButtonGotoSection":
            return <ButtonGotoSection attrs={props.attrs}/>

        default:
            return <p>Element not found</p>
    }
}
