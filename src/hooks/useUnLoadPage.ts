import { useEffect } from "react";

export default function useUnLoadPage(condition = true){
    
    useEffect(() => {
        if(!condition){
            return;
        }

        const handler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        }

        window.addEventListener("beforeunload", handler);

        return () => {
            window.removeEventListener("beforeunload", handler);
        }
    }, [condition])
}