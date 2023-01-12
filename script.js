const getid = id => document.getElementById(id);
function main() {
    //const csv = '10,20,Lorem,10000\n30,40,Ipsum,4000\n#Lorem Ipsum Dolor\n20,10,Dolor,5000\n4,15,Sit,1000\n50,20,Amet,8000\n#Sit Amet Consectetur\n10,10,Consectetur,10\n30,20,Adipiscing,10000\n30,25,Elit,9000\n34,10,Dolorem,6000\n40,20,Picsum,9\n50,30,Asdf,11000\n10,5,Jklmn,7000';

    function extractReplacer(csv) {
        const top10 =
            csv
                .replaceAll('\r', '\n')
                .split(/\n+/)
                .filter(el => el[0] !== '#')
                .map(el => el.split(','))
                .map(el => ({x: +el[0], y: +el[1], city: el[2], population: +el[3]}))
                .sort((a, b) => b.population - a.population)
                .slice(0, 10)
                .reduce((res, curr, idx) => ({...res, [curr.city]: {population: curr.population, rating: idx + 1}}), {});
        return text => Object.entries(top10).reduce((res, [city, {rating, population}]) => res.replaceAll(city, `${city} (${rating} место в ТОП-10 самых крупных городов Украины, население ${population} человек)`), text);
    }

    let replacer = String;

    getid('replace').onclick = () => getid('res').innerHTML = replacer(getid('text').value);
    getid('extract').onclick = () => replacer = extractReplacer(getid('csv').value);
    //console.log(extractReplacer(csv)('QWER Lorem Ipsum asdf ASDF Asdf Dolor Sit lkdjkj jklmn Jklmn Amet Consectetur dkdjfkj Adipiscing Elit ... Dolorem asdf Asdf Lorem dkfjkdfjk Jkmn'));
}

document.addEventListener('DOMContentLoaded', main);