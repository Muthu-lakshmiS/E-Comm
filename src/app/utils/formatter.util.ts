import { Injectable } from '@angular/core';
import { AppUserTypeEnum, AppInterfaceEnum, ServiceStatusEnum, ServiceEscalationRule, TaskUpdateEnum } from '../models/task';

@Injectable(
    { providedIn: 'root' }
)
export class GenericFormatter {

    formatUserType(appUser: AppUserTypeEnum) {

        switch (appUser) {
            case AppUserTypeEnum.CUSTOMER_CARE:
                return 'Customer Care';
            case AppUserTypeEnum.PATIENT:
                return 'Patient';
            case AppUserTypeEnum.STAFF:
                return 'Staff';
            case AppUserTypeEnum.SYSTEM:
                return 'Diago';
        }
    }

    formatAppinterface(appInterface: AppInterfaceEnum) {
        switch (appInterface) {
            case AppInterfaceEnum.FEEDBACK_APP:
                return 'Feedback';
            case AppInterfaceEnum.DIAGO_TEAMS:
                return "Teams"
        }
    }

    formatTaskStatus(status: ServiceStatusEnum) {
        switch (status) {
            case ServiceStatusEnum.COMPLETED:
                return 'Resolved';
            case ServiceStatusEnum.CREATED:
                return 'Created';
            case ServiceStatusEnum.RAISED:
                return 'Raised';
        }
    }

    formatTaskUpdateEnum(update: TaskUpdateEnum) {
        switch (update) {
            case TaskUpdateEnum.COMMENT:
                return 'Comment';
            case TaskUpdateEnum.COMPLETED:
                return 'Resolved comment';
            case TaskUpdateEnum.ESCALATED:
                return 'Escalated';
            case TaskUpdateEnum.RAISED:
                return 'Raised';
            case TaskUpdateEnum.REASSIGN:
                return 'Reassigned';
            case TaskUpdateEnum.UPDATE_AFTER_COMPLETED:
                return 'Comment after resolved';
        }
    }
    formatTaskUpdateColor(update: TaskUpdateEnum) {
        switch (update) {
            case TaskUpdateEnum.COMMENT:
                return 'orange';
            case TaskUpdateEnum.COMPLETED:
                return 'green';
            case TaskUpdateEnum.ESCALATED:
                return 'indigo';
            case TaskUpdateEnum.RAISED:
                return 'blue';
            case TaskUpdateEnum.REASSIGN:
                return 'red';
            case TaskUpdateEnum.UPDATE_AFTER_COMPLETED:
                return 'light-green';
        }
    }
}