import {ElementProcessor} from "./ElementProcessor";
import {ContextMain} from "../ContextManagers/ContextMain";
import {Show, useContext} from "solid-js";
import {ElementEdit} from "./ElementEdit";
import {ElementAdd} from "./ElementAdd";


export default function Index() {

    const ctxMain = useContext(ContextMain)

    return (
        <div className={'fb-container'}>

            <div className={'fb-menu'}>


                <Show when={ctxMain.building()}>
                    <button
                        className={'fb-button fb-button-confirm w-full'}
                        onClick={() => ctxMain.setBuilding(false)}
                    >
                        View Mode
                    </button>
                </Show>


                <Show when={!ctxMain.building()}>
                    <button
                        className={'fb-button fb-button-confirm w-full'}
                        onClick={() => ctxMain.setBuilding(true)}
                    >
                        Build Mode
                    </button>
                </Show>

                <hr className={'my-2 py-2'}/>

                <ElementEdit/>

                <ElementAdd/>

                <Show when={ctxMain.editElement().element === null}>
                    <div className={'fb-new-element'}>
                        <span className={'opacity-60'}>Select element to edit, or add a new element</span>
                    </div>
                </Show>

            </div>

            <div className={'fb-elements'}>
                <ElementProcessor/>
            </div>

        </div>
    )
}