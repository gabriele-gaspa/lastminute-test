import { FormControl, FormArray, FormGroup } from "@angular/forms";

// This bind any interface with the FormGroup generating a type-safe form matching existing keys and FormControl type
export type WithControlsFrom<T> = {
    [P in keyof T]?: FormControl<T[P]> | FormArray<FormControl<T[P]>> | FormGroup<{ [K in keyof T]: FormControl<T[K]> }>;
};