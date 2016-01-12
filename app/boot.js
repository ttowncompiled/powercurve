System.register(['angular2/platform/browser', './app.component', './character/character.component', './lib/firebase'], function(exports_1) {
    var browser_1, app_component_1, character_component_1, firebase_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (character_component_1_1) {
                character_component_1 = character_component_1_1;
            },
            function (firebase_1_1) {
                firebase_1 = firebase_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [firebase_1.FirebaseService]);
            browser_1.bootstrap(character_component_1.CharacterComponent, [firebase_1.FirebaseService]);
        }
    }
});
//# sourceMappingURL=boot.js.map