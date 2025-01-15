type identifier = string | number;
type keys = (string | number) [];

let uuid: identifier = "201e72bb-49e3-40ef-8331-7f3e7d947f8";
console.log(uuid);
uuid = 1365;

let keys: keys = [1, "hello world", 32];
console.log(keys);

let courseId: number | null;
courseId = null;
console.log(courseId);
courseId = 1244;
console.log(courseId);
