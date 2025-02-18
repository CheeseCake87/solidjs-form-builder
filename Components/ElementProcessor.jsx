import {createEffect, createSignal, For, Show, useContext} from "solid-js";
import {ContextMain} from "../ContextManagers/ContextMain";
import {ElementRender} from "./ElementRender";
import Add from "./Icons/Add";

export function ElementProcessor() {
    const ctxMain = useContext(ContextMain)

    return <>

        <Show when={ctxMain.building()}>
            <div className={'fb-section-nav'}>
                <For each={ctxMain.sections()}>
                    {(element, index) =>
                        <button
                            className={
                                `fb-button ${ctxMain.activeSection() === element.id
                                    ? 'fb-button-confirm-selected'
                                    : 'fb-button-confirm'}`
                            }
                            onClick={() => ctxMain.setActiveSection(element.id)}>
                            [{element.id}] {element.label}
                        </button>
                    }
                </For>
                <button
                    className={'fb-button fb-button-confirm'}
                    onClick={() => ctxMain.addSection()}
                >
                    <Add size={14}/>
                </button>
            </div>
        </Show>

        {/* Loop through each available element, order, and
        only show those that have a parent value of 0 */}

        <For each={ctxMain.sections()}>
            {(element, _) => {
                if (!ctxMain.activeSection()) {
                    ctxMain.setActiveSection(element.id)
                }
                return <ElementRender attrs={element}/>
            }}
        </For>

    </>
}