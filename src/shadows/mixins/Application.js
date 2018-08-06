export default function augment(application, shadowFilter){
    // Remove the current render fucntion
    application.ticker.remove(application.render, application); 

    // Overwrite the render function
    application.render = function(){
        // Update stage transforms
        const cacheParent = this.stage.parent;
        this.stage.parent = this.renderer._tempDisplayObjectParent;
        this.stage.updateTransform();
        this.stage.parent = cacheParent;
    
        // Update the shadow filter
        shadowFilter.update(this.renderer);
    
        // Render the stage without updating the transforms again
        this.renderer.render(this.stage, undefined, undefined, undefined, true);
    }

    // Reassign ticker because its setter initialises the render method
    application.ticker = application.ticker;
    console.log(application, application.ticker);
}