import {createSignal, For, Show, useContext} from "solid-js";
import {ContextMain} from "../ContextManagers/ContextMain";

export function SectionEdit() {
    const ctxMain = useContext(ContextMain)

    const [label, setLabel] = createSignal(ctxMain.editElement().label)

    return (
        <div className={'fb-edit-section'}>
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
            <button
                className={'fb-button fb-button-danger'}
                onClick={() => ctxMain.deleteElement(ctxMain.editElement().id)}
            >
                Delete
            </button>
        </div>
    )
}

export function GroupEdit() {
    const ctxMain = useContext(ContextMain)

    const [style, setStyle] = createSignal(ctxMain.editElement().style)

    const styles = ["column", "row"]

    return (
        <div className={'fb-edit-section'}>
            <div className={'py-2'}>
                <p className={'text-xs'}>Edit</p>
                <p className={'text-lg'}>Group</p>
            </div>

            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_style_edit`}>
                    Display Style
                </label>
                <select
                    className={'fb-select'}
                    onChange={
                        (e) => setStyle(e.target.value)
                    }
                >
                    <For each={styles}>
                        {(s) =>
                            <option
                                value={s}
                                selected={style() === s}
                            >{s}</option>
                        }
                    </For>
                </select>
            </div>

            <button
                className={'fb-button fb-button-confirm'}
                onClick={() => ctxMain.updateElement(
                    ctxMain.editElement().id,
                    {
                        'style': style()
                    }
                )}
            >
                Update
            </button>

            <button
                className={'fb-button fb-button-danger'}
                onClick={() => ctxMain.deleteElement(ctxMain.editElement().id)}
            >
                Delete
            </button>
        </div>
    )
}

export function HeaderEdit() {
    const ctxMain = useContext(ContextMain)

    const [text, setText] = createSignal(ctxMain.editElement().text)

    return (
        <div className={'fb-edit-section'}>
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

            <button
                className={'fb-button fb-button-danger'}
                onClick={() => ctxMain.deleteElement(ctxMain.editElement().id)}
            >
                Delete
            </button>
        </div>
    )
}

export function TextEdit() {
    const ctxMain = useContext(ContextMain)

    const [text, setText] = createSignal(ctxMain.editElement().text)

    return (
        <div className={'fb-edit-section'}>
            <div className={'py-2'}>
                <p className={'text-xs'}>Edit</p>
                <p className={'text-lg'}>Text ({ctxMain.editElement().id})</p>
            </div>
            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_text_edit`}>Text</label>
                <textarea name={ctxMain.editElement().id}
                          id={`${ctxMain.editElement().id}_text_edit`}
                          className={'fb-textarea'}
                          onKeyUp={(e) => setText(e.target.value)}
                >{ctxMain.editElement().text ? ctxMain.editElement().text : ''}</textarea>
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

            <button
                className={'fb-button fb-button-danger'}
                onClick={() => ctxMain.deleteElement(ctxMain.editElement().id)}
            >
                Delete
            </button>
        </div>
    )
}


export function InputTextEdit() {

    const ctxMain = useContext(ContextMain)

    const [label, setLabel] = createSignal(ctxMain.editElement().label)
    const [defaultValue, setDefaultValue] = createSignal(ctxMain.editElement().default_value)
    const [matchField, setMatchField] = createSignal(ctxMain.editElement().match_field)

    return (
        <div className={'fb-edit-section'}>
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
                       onKeyUp={(e) => setLabel(e.target.value)}
                       value={ctxMain.editElement().label ? ctxMain.editElement().label : ''}/>
            </div>
            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_default_value_edit`}>Default
                    Value</label>
                <input className={'fb-input'}
                       type="text"
                       id={`${ctxMain.editElement().id}_default_value_edit`}
                       name={ctxMain.editElement().id}
                       onKeyUp={(e) => setDefaultValue(e.target.value)}
                       value={ctxMain.editElement().default_value ? ctxMain.editElement().default_value : ''}/>
            </div>
            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_match_field_edit`}>
                    Match Field
                </label>
                <select
                    className={'fb-select'}
                    onChange={
                        (e) => setMatchField(e.target.value)
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

            <button
                className={'fb-button fb-button-confirm'}
                onClick={() => ctxMain.updateElement(
                    ctxMain.editElement().id,
                    {
                        'label': label(),
                        'default_value': defaultValue(),
                        'match_field': matchField(),
                    }
                )}
            >
                Update
            </button>

            <button
                className={'fb-button fb-button-danger'}
                onClick={() => ctxMain.deleteElement(ctxMain.editElement().id)}
            >
                Delete
            </button>

        </div>
    )
}

export function InputNumberEdit() {
    const ctxMain = useContext(ContextMain)

    const [label, setLabel] = createSignal(ctxMain.editElement().label)
    const [defaultValue, setDefaultValue] = createSignal(ctxMain.editElement().default_value)
    const [matchField, setMatchField] = createSignal(ctxMain.editElement().match_field)

    return (
        <div className={'fb-edit-section'}>
            <div className={'py-2'}>
                <p className={'text-xs'}>Edit</p>
                <p className={'text-lg'}>Input Number</p>
            </div>
            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_label_edit`}>
                    Label
                </label>
                <input className={'fb-input'}
                       type="text"
                       id={`${ctxMain.editElement().id}_label_edit`}
                       name={ctxMain.editElement().id}
                       onKeyUp={(e) => setLabel(e.target.value)}
                       value={ctxMain.editElement().label ? ctxMain.editElement().label : ''}/>
            </div>
            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_default_value_edit`}>
                    Default Value
                </label>
                <input className={'fb-input'}
                       type="number"
                       id={`${ctxMain.editElement().id}_default_value_edit`}
                       name={ctxMain.editElement().id}
                       onKeyUp={(e) => setDefaultValue(e.target.value)}
                       value={ctxMain.editElement().default_value ? ctxMain.editElement().default_value : ''}/>
            </div>
            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_match_field_edit`}>
                    Match Field
                </label>
                <select
                    className={'fb-select'}
                    onChange={
                        (e) => setMatchField(e.target.value)
                    }
                >
                    <For each={ctxMain.elementLib()["Input Number"].match_field}>
                        {(mf) =>
                            <option
                                value={mf}
                                selected={ctxMain.editElement().match_field === mf}
                            >{mf}</option>
                        }
                    </For>
                </select>
            </div>

            <button
                className={'fb-button fb-button-confirm'}
                onClick={() => ctxMain.updateElement(
                    ctxMain.editElement().id,
                    {
                        'label': label(),
                        'default_value': defaultValue(),
                        'match_field': matchField(),
                    }
                )}
            >
                Update
            </button>

            <button
                className={'fb-button fb-button-danger'}
                onClick={() => ctxMain.deleteElement(ctxMain.editElement().id)}
            >
                Delete
            </button>

        </div>
    )
}


export function ButtonGotoSectionEdit() {
    const ctxMain = useContext(ContextMain)

    const [label, setLabel] = createSignal(ctxMain.editElement().label)
    const [gotoSection, setGotoSection] = createSignal(ctxMain.editElement().goto_section)

    return (
        <div className={'fb-edit-section'}>
            <div className={'py-2'}>
                <p className={'text-xs'}>Edit</p>
                <p className={'text-lg'}>Button To Section ({ctxMain.editElement().id})</p>
            </div>

            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_label_edit`}>
                    Label
                </label>
                <input className={'fb-input'}
                       type="text"
                       id={`${ctxMain.editElement().id}_label_edit`}
                       name={ctxMain.editElement().id}
                       onKeyUp={(e) => setLabel(e.target.value)}
                       value={ctxMain.editElement().label ? ctxMain.editElement().label : ''}/>
            </div>

            <div className={'fb-input-group'}>
                <label className={'fb-label'} htmlFor={`${ctxMain.editElement().id}_goto_section_edit`}>
                    Goto Section
                </label>
                <select
                    id={`${ctxMain.editElement().id}_goto_section_edit`}
                    className={'fb-select'}
                    onChange={
                        (e) => setGotoSection(e.target.value)
                    }
                >
                    <For each={ctxMain.sections()}>
                        {(s) =>
                            <option
                                value={s.id}
                                selected={ctxMain.editElement().goto_section === s.id}
                            >{s.id} - {s.label}</option>
                        }
                    </For>
                </select>
            </div>

            <button
                className={'fb-button fb-button-confirm'}
                onClick={() => ctxMain.updateElement(
                    ctxMain.editElement().id,
                    {
                        'label': label(),
                        'goto_section': parseInt(gotoSection()),
                    }
                )}
            >
                Update
            </button>

            <button
                className={'fb-button fb-button-danger'}
                onClick={() => ctxMain.deleteElement(ctxMain.editElement().id)}
            >
                Delete
            </button>

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
            <Show when={ctxMain.editElement().element === 'Group'}>
                <GroupEdit/>
            </Show>
            <Show when={ctxMain.editElement().element === 'InlineGroup'}>
                <InlineGroupEdit/>
            </Show>

            <Show when={ctxMain.editElement().element === 'Header'}>
                <HeaderEdit/>
            </Show>
            <Show when={ctxMain.editElement().element === 'Text'}>
                <TextEdit/>
            </Show>

            <Show when={ctxMain.editElement().element === 'InputText'}>
                <InputTextEdit/>
            </Show>

            <Show when={ctxMain.editElement().element === 'InputNumber'}>
                <InputNumberEdit/>
            </Show>

            <Show when={ctxMain.editElement().element === 'ButtonGotoSection'}>
                <ButtonGotoSectionEdit/>
            </Show>
        </>
    )

}
