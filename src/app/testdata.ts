import { InMemoryDbService } from "angular-in-memory-web-api";

export class TestData implements InMemoryDbService{
    createDb(){
        let bookdetails=[
            {
                "id":100,
                "name":"Angular Tutorial",
                "category":"Learning",
                "description":"It is good book for lean start to end angular for beginers",
                "writer":"kirti pitale"
            },
            {
                "id":101,
                "name":"Asp.net with #c",
                "category":"Beginer Level",
                "description":"It is good book for lean start to end angular for beginers",
                "writer":"piya kadge"
            },
            {
                "id":102,
                "name":"Linux Red Hat",
                "category":"Advance",
                "description":"It is good book for simple syntax with short examples",
                "writer":"vaishali kasar"
            }
        ];
        return {books : bookdetails};
    }
}