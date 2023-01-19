import { IComposerData } from "interfaces/ComposersInterfaces";

export interface ComposerProps {
    composerData: IComposerData;
    handleImageClick: (composer: string) => void;
}