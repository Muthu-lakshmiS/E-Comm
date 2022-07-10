import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'secureField' })
export class ExponentialStrengthPipe implements PipeTransform {



    transform(value: string, type = 1): string {
        let session = localStorage.getItem('auth');
        if (!session) {
            return '####';
        }
        let auth = JSON.parse(session);
        if (!auth.acls || !auth.acls.includes('ROLE_ADMIN')) {
            return '####';
        }
        return value;
    }
}