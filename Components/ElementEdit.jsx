import {createSignal, For, Show, useContext} from "solid-js";
import {ContextMain} from "../ContextManagers/ContextMain";

export function SectionEdit() {
    const ctxMain = useContext(ContextMain)

    const [label, setLabel] = createSignal(ctxMain.editElement().label)

    return (
        <div className={'flex flex-col gap-4'}>
            <div className={'py-2'}>
                <p className={'text-xs'}>Edit</p>
                <p className={'text-lg'}>Section</p>
            </div>
            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_label_edit`}>Label</label>
                <input className={'fb-input'}
                       type="text"
                       id={`${ctxMain.editElement().id}_label_edit`}
                       name={ctxMain.editElement().id}
                       onKeyUp={(e) => setLabel(e.target.value)}
                       value={ctxMain.editElement().label ? ctxMain.editElement().label : 'Section'}/>
            </div>
            <button
                className={'fb-button fb-button-confirm'}
                onClick={() => ctxMain.updateElement(
                    ctxMain.editElement().id,
                    {
                        'label': label()
                    }
                )}
            >
                Update
            </button>
        </div>
    )
}

export function InputGroupEdit() {
    const ctxMain = useContext(ContextMain)
    return (
        <div className={'flex flex-col gap-4'}>
            <div className={'py-2'}>
                <p className={'text-xs'}>Edit</p>
                <p className={'text-lg'}>Input Group ({ctxMain.editElement().id})</p>
            </div>
        </div>
    )
}

export function InlineInputsEdit() {
    const ctxMain = useContext(ContextMain)
    return (
        <div className={'flex flex-col gap-4'}>
            <div className={'py-2'}>
                <p className={'text-xs'}>Edit</p>
                <p className={'text-lg'}>Inline Inputs</p>
            </div>
        </div>
    )
}

export function HeaderEdit() {
    const ctxMain = useContext(ContextMain)

    const [text, setText] = createSignal(ctxMain.editElement().text)

    return (
        <div className={'flex flex-col gap-4'}>
            <div className={'py-2'}>
                <p className={'text-xs'}>Edit</p>
                <p className={'text-lg'}>Header ({ctxMain.editElement().id})</p>
            </div>
            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_text_edit`}>Text</label>
                <input className={'fb-input'}
                       type="text"
                       id={`${ctxMain.editElement().id}_text_edit`}
                       name={ctxMain.editElement().id}
                       onKeyUp={(e) => setText(e.target.value)}
                       value={ctxMain.editElement().text ? ctxMain.editElement().text : ''}/>
            </div>
            <button
                className={'fb-button fb-button-confirm'}
                onClick={() => ctxMain.updateElement(
                    ctxMain.editElement().id,
                    {
                        'text': text()
                    }
                )}
            >
                Update
            </button>
        </div>
    )
}

export function TextEdit() {
    const ctxMain = useContext(ContextMain)
    return (
        <div className={'flex flex-col gap-4'}>
            <p className={'text-lg'}>Text ({ctxMain.editElement().id})</p>
            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_text_edit`}>Text</label>
                <textarea name={ctxMain.editElement().id}
                          id={`${ctxMain.editElement().id}_text_edit`}
                          className={'fb-textarea'}
                          onKeyUp={(e) => ctxMain.updateAttribute(
                              ctxMain.editElement().id, 'text', e.target.value)}
                >{ctxMain.editElement().text ? ctxMain.editElement().text : ''}</textarea>
            </div>
        </div>
    )
}

export function ButtonToSectionEdit() {
    const ctxMain = useContext(ContextMain)
    return (
        <div className={'flex flex-col gap-4'}>
            <div className={'py-2'}>
                <p className={'text-xs'}>Edit</p>
                <p className={'text-lg'}>Button To Section ({ctxMain.editElement().id})</p>
            </div>
        </div>
    )
}

export function InputTextEdit() {

    const ctxMain = useContext(ContextMain)

    return (
        <div className={'flex flex-col gap-4'}>
            <div className={'py-2'}>
                <p className={'text-xs'}>Edit</p>
                <p className={'text-lg'}>Input Text ({ctxMain.editElement().id})</p>
            </div>
            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_label_edit`}>Label</label>
                <input className={'fb-input'}
                       type="text"
                       id={`${ctxMain.editElement().id}_label_edit`}
                       name={ctxMain.editElement().id}
                       onKeyUp={(e) => ctxMain.updateAttribute(
                           ctxMain.editElement().id, 'label', e.target.value)}
                       value={ctxMain.editElement().label ? ctxMain.editElement().label : ''}/>
            </div>
            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_default_value_edit`}>Default
                    Value</label>
                <input className={'fb-input'}
                       type="text"
                       id={`${ctxMain.editElement().id}_default_value_edit`}
                       name={ctxMain.editElement().id}
                       onKeyUp={(e) => ctxMain.updateAttribute(
                           ctxMain.editElement().id, 'default_value', e.target.value)}
                       value={ctxMain.editElement().default_value ? ctxMain.editElement().default_value : ''}/>
            </div>
            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_match_field_edit`}>Match
                    Field</label>
                <select
                    className={'fb-select'}
                    onChange={
                        (e) => ctxMain.updateAttribute(
                            ctxMain.editElement().id, 'match_field', e.target.value
                        )
                    }
                >
                    <For each={ctxMain.elementLib()["Input Text"].match_field}>
                        {(mf) =>
                            <option
                                value={mf}
                                selected={ctxMain.editElement().match_field === mf}
                            >{mf}</option>
                        }
                    </For>
                </select>
            </div>
        </div>
    )
}


export function ElementEdit() {
    const ctxMain = useContext(ContextMain)

    return (
        <>
            <Show when={ctxMain.editElement().element === 'Section'}>
                <SectionEdit/>
            </Show>
            <Show when={ctxMain.editElement().element === 'InputGroup'}>
                <InputGroupEdit/>
            </Show>
            <Show when={ctxMain.editElement().element === 'InlineInputs'}>
                <InlineInputsEdit/>
            </Show>
            <Show when={ctxMain.editElement().element === 'Header'}>
                <HeaderEdit/>
            </Show>
            <Show when={ctxMain.editElement().element === 'Text'}>
                <TextEdit/>
            </Show>
            <Show when={ctxMain.editElement().element === 'ButtonToSection'}>
                <ButtonToSectionEdit/>
            </Show>
            <Show when={ctxMain.editElement().element === 'InputText'}>
                <InputTextEdit/>
            </Show>
        </>
    )

}
