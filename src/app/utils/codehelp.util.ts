export class CodeHelp {
    static dhmsFromSeconds(seconds: number) {
        seconds = seconds < 0 ? -seconds : seconds;
        let dhms: any = {};
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        var dDisplay = d > 0 ? d : undefined;
        var hDisplay = h > 0 ? h : undefined;
        var mDisplay = m > 0 ? m : undefined;
        var sDisplay = s > 0 ? s : undefined;
        dhms.day = dDisplay;
        dhms.hour = hDisplay;
        dhms.minute = mDisplay;
        dhms.second = sDisplay;
        return dhms;
    }
    static dhmsFromMs(seconds: number) {
        seconds = seconds < 0 ? -seconds /1000: seconds/1000;
        let dhms: any = {};
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        console.log(s);
        var dDisplay = d > 0 ? d : undefined;
        var hDisplay = h > 0 ? h : undefined;
        var mDisplay = m > 0 ? m : undefined;
        var sDisplay = s > 0 ? s : undefined;
        dhms.day = dDisplay;
        dhms.hour = hDisplay;
        dhms.minute = mDisplay;
        dhms.second = sDisplay;
        return dhms;
    }
}