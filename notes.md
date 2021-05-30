# Code Assist


## Reqs

- Classify code
- Define templates
- Generate new code within classifications


## Use Cases


### Action Generation
I have a controller layer with 50+ endpoints. I want to add a new endpoint following the same format. 

1. Define the format in the template
2. Ensure the DTO directory is defined

```
[Http{{Method}}]
[Authenticate]
public ActionResult {{ActionName}} {
    {{CUSTOM_CODE}}
}
```

2. Choose the controller
3. Choose "Add Action"
4. Select the Method and the Name
5. Endpoint code is generated in the controller
6. DTO class is generated in the DTO directory

### Entity Generation
I want to create a new entity.

1. Ensure the connection is set to your dev database
2. Ensure the model directory is defined in your project
3. Select "Create a new Entity"
4. Define the entity fields
5. Migration script is generated
6. Related model class is generated