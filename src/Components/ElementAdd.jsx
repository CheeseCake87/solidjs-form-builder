import {For, Show, useContext} from "solid-js";
import {ContextMain} from "../ContextManagers/ContextMain";


export function ElementAdd() {

    const ctxMain = useContext(ContextMain)

    return (
        <>
            <Show when={ctxMain.addElementTo() !== null}>
                <div className={'py-2'}>
                    <p className={'text-xs'}>Add to</p>
                    <p className={'text-lg'}>
                        {ctxMain.elements()[ctxMain.addElementTo()].element}
                    </p>
                </div>
                <div className={'flex flex-col gap-1 w-full'}>
                    {/* Loop over element library */}
                    <For each={Object.entries(ctxMain.elementLib())}>{(element) =>
                        <button
                            className={'fb-button fb-button-confirm'}
                            onClick={() => ctxMain.addElement(
                                ctxMain.elements()[ctxMain.addElementTo()],
                                element[1]
                            )}
                        >
                            {element[0]}
                        </button>}
                    </For>
                </div>
            </Show>
        </>
    )

}
