import { Dispatch, useEffect } from "react";
import { sleep } from "./sleep";

export function SetAfterTime(state: boolean, setState: Dispatch<boolean>, time: number) {
    return useEffect(() => {
        const run = async () => {
            if (!state) {
                await sleep(time);
                setState(true);
            }
        }
        run();
    }, [])
}
