System.register(['angular2/platform/browser', './app.component', './character/character.component'], function(exports_1) {
    var browser_1, app_component_1, character_component_1;
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
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent);
            browser_1.bootstrap(character_component_1.CharacterComponent);
        }
    }
});
//# sourceMappingURL=boot.js.map