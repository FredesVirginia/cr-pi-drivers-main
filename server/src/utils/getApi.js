const express = require('express');
const path = require('path');
const {Driver , Teams} = require ("../db.js");
const app = express();

app.use(express.json());

async function readJsonFile() {
  try {
    const jsonPath = path.join(__dirname, '..', '..', 'api', 'db.json');
    const jsonData = require(jsonPath);
    let imgNueva = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoGCBMVExUTFRUYExUYGhkcGBcaFRgaGB0hGBgYGhwcGhobHysmGhwoHxkbJDkkKCwuMjI0GSE3PEQxOysxMi4BCwsLDw4PHRERHDkoHyk7Njs2OzIzOTYxNTM5PDY6MzY7MTsxMTExMS43MTEzOTExOzExOTEzMTExOTE5MTExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUCCAH/xABKEAACAQMCBAMFBQYCBgcJAAABAgMABBESIQUGMUETUWEHIjJxgRRCUmKRIzNygpKhQ1MVY6KxwuEkc4OTwdHwFhclNGSjsrPD/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAMEBQIBBv/EACoRAQACAQMCBQQCAwAAAAAAAAABAgMEERIhMQUTIjJBUXGx0aHBYYGR/9oADAMBAAIRAxEAPwC3qUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKV5kkCgsxCqBkkkAADuSegqGcQ9otvrMNnHJxCQdRCv7MfxSEYx6gEUE1pVTcX594skhj+z20BABKuzSuMjIBZGAzjBxjuK1uHc9cZllSGNLWV3yQvhyAAL1ZjrGle2fMgVxzrvtv1SzgyRXnNfT9VxUqu//AHg3NuQL/h8kKf5sLCRNupI7DG/xZ61MeAcetrxPEt5VlA6gHDr/ABId1+ortE6dKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFcvmXjkFnA0876UGwA3Z2OcIg7scfTBJwATW/dTpGjyOwREUszE4ACjJJ9ABVc8HjbiVwOJXCkQISLKFugAP75x3YkbfL0BoPH+jrrihE18WgtOsdijFSR1DTMMEn06jtp7yYrBa27lUWKKJGcqigDCgsdh3261uUoKWu70vrmcklyXdgrFctucHGMDoPQCrC9nfBjDB4zriaYBiD1RP8NPQ4Oo+rHyqUZr8qHHhrSZt3mVvUay2alabbRH0fjqCMEZHkaiHHuS18QXNm5tLldw0eyk/mUbEHbPn31d5hSplRxuRuc2mkNneIILxRsOiSgZ96P82xJX0OOhAmtV3z9y+LiMSofDmiOpJBsykEEHI3wDv/AH6iu37OeZWvIWSUaLuA+HOm3Xs4A+62D9Qe2KCU0pSgUpSgUrzJIFBZiFUDJJIAAHUknoKrnm72g5BSzbQhOk3JUksemm2jP7w521kafLVQSnmbmu3tGEbapZm3EMWDJj8TZICL6sRntXU4TfxzwxzxkmORQy5GDv2I7EdCPSvnnjtvdRkCaKSBJCH/AGoctMT737WTOWJ7rqyN+lWTyXz6fAHjWTQ20eE+0QIzW6Yz1XGUUY3Kl8Z3xQWRSsVrcJIiyRsrowBVlIKkHoQR1FZaBSlKBSlKBSlKBSlKBSlKCDe0u4aeW34UhI8Y+LckHdYYz09NbDH8vrXbhjVFVFAVVACqOgAGAB6YqKcvXPjcQvbsgnXKbeL0jgGDp9Gb3j8vWpJxHiEEK6ppI4V7F3C5+Wev0oNmlRibnywGQkjzEf5cMjfodIB/WtV+fo/uWl03qURP975oJjSoaOfl72dyPl4Z/wCOs8HPtqfjjuIf44GI/VNVBK6VyOHczWUxAjuYix+6W0P/AEvg/wBq69AdQQQeh2P1qCcZc2HEY78bRswiufIxyY0uf4Tj+lRU7rh858PE0BjPRwUJx01A4P0ODQTilRz2acRafh1u758RFMcmeuqImM59SFB+tSOgVx+Z+Y7eyQNKxLtnw4kGqSQjsq+X5jgCotzf7QkXXFZFJHXaS4b9xF54P+K/oNvPO4qO8D5OvL1ZJ5JWgDgn7RMpaeXqRpQkeFF+mwGB3oOVzjzfNdNpkxp2K2iNmNe4ad/8Vunu/COw71tcg8x8Ottc14jteLkxPjxFI6BIV2ETb4y3r73YcLgPL5uLw2KTwqQW/bBtSPp3PhZwZHxnb0O+1XPwTk7h8Fu8AjEglBWV5Ped8ZG7fdAKkgLgAjI33oKl5z5xub/Mb4ht8giFd84OQZH6sQd8DA+fWpT7K+dtOiwuyNJwkEpAA8hFJ236Bu/Q74qF85cvvY3BiJLxMW8GUjqASND/AJ1xj16+g9cqcq3HEXKRroiBw87A6F9E/G/oOncigsTjl3FwW4R43X7HcMfFtM5eInrLAo6R/iXp5dRiwIJVdVdGDIwDKwOQQRkEHuCK+c+aeGz293LDcu0snxCV2LGSM5CNliTjAxjsQRU89iXMR9/h0jZ0gvbkn7v34/5T7w9C3YCgtOlKUClKUClKUClKUCsN7N4cckn4EZv6VJ/8KzVzeaM/Y7rHXwJcf901BWnBpWtuExyKxEjRAI5wSJLuU4ffqVDA/wAtcJbGPVrYeI56ySEyOf5mya7fGjjhfCwPvm2z/Lbu2P6hmuY7gAkkADck7AY7mg/c49BX65CqXc6RjO+2B11N5DyHfr0xqKCPedTnbRGVOR5M69S520x422J946V9qNDeLIQ0oOpVJBWIjfW56PL3/CnXdt1D8MZAGoFWO4QjDAHoXB3UnrpO/njpRE90OdlPw+beq/k/N36DO5XJHENInmB0NvFEc65j+N+6w/3k9FyT5V2lLSuxVMkawBqYrsUiHTC4wWxpXGBqI00GtPbo+zorjvlQceXWvNnA0W8Estv3xHIdH1jbKn9K2ZHzjC6VGwAzgfU7lvMnc15FBLeSuOzTPJBNoZ40R1kVSusMXU6l3AYFR02OroKkHEVBjbPYZ/Q5xUE5Bf8A+ISD/wCm/wD6j/nWP2gXMounjEsix+FEdCyOqZOsHZSPwg/Wub2iteUpsOGc1orHd2+ReMwWcXEfHk0RpdF1zksTNGjBEXqze6dh6movzxzrLdZjbVBbsNrZWxNID3nYfu0/IPXPatHkbluW7uZxGVQJ4eud/eePUrZCKfidsdSQBp75xU14j7JbcqTDcTJIfvSaJFY/mAVW39DtXsTvG6O9eNprPwrjgPGPBuIppII7lFIEdvhsKSfdMYGzS+WpT9DvXZ5+5yu7p5IGV7SFThrc5WRvIzEgHBG+ke7v97rUo5A4XBw6cR3kWLxyfDnYhomHlA2BpOOqkB+vUdJTztyrbcQh1EiOZVOicAZXbOl/xJ5qenbFeuVBqcYKkqVIKlThlI3BUjoQe48qsrl32iRfZn+2M3jIdOmMe/KGQYdRsASUcNvgGQnbOKhXLHLU97O8MbxAREiSUOHTqxBiUHMgYKxB2G25BxVi8a9mEIsmS3XFyh8RZHILyEAgxs3ZWAXAGADvQV9zdzPc3+VlCxREhhEm/vBdOWc7k9TgYHvGrT9kXM6XNsLZgsdxbqFZFUKrINldFAAA7EDofLIqkvEGMn3exB2IPQgjzztipdy7ybxXQ19ADayRoxiDbSy5G6hCMKCM4198bdwEx9uUFq1ujPIqXSHMK9XcHAZCoydB66jsCB5mo9ytyZI1kvE7ebXdpiSCNPgBQ+/G5OCzsAykbAZxv1qBeKZCZGZndj77uSzkjrqZtyfnUn9nXOA4dKyyZNrLkuqjLLIF2dR31ABSPke1BdPLnFY7u3iuI/hkXOO6noyH1VgR9K6NU9yNzpGnEZlKfZ7S8k1IhYERSkAaiegEhG4GwJHYZq4aBSlKBSlKBSlKBWC+h8SOSP8AGjL/AFKR/wCNZ6UFMXz+Jwbh0g/wpolYdxp8SEg+W5rDCwU6sZYfBn4VP48d2HbsOu5xp6fFLFhBxaxGS8Uv2mEY6pIyzqFHfdWXbua4sUoZQ43UgEY36jNB6mlCguxxjqe++3zJOceua2YrcR4eZAZNjHbtuqdw84+8/cRdB1bfAHm0YRkSnDTD933WH8y9mmP4ui9FyctWGR+rMfMkk/Ukk0HqdzI7PITIzdSScn0JG4X0GM7dAMV7jGoCRto8YTGAX07BYwBhYx01YwOignOnwIe8o27RHILeRm7qn+r+JvvYGzepWeRs6hk9Xb4VA26DrgbBF9AMDJAeS5dtIwDjPcIi5+JuuFyfUsT3Jr1Iw+Fc6e5PxMfNvL0UbAeZyxEqq6Ezpzklsa3bGNbkbZxsFGyjYdyfFB1fZ2mb64b8MES/1SMf+GupzdNwxXfx0R59C7eE7tg505wMY69a1PZjFmW9l7F4ox/2cZY//srlc88OuTcXNwYsQgKVkMiBdKRrnbUWzq1/dri8zEdI3S4IrNtrW2hJvYsqNHeTxp4aPOFVNIXAijXspI6uenfNWDUb9mnDWt+HW6MMO6mRhjBDSkvg+oBA+lSSu0c9+jU4vw6G4iaGVA6N26EEdGUjdWHUEbiqV9oc1/buLCaZntiNUbAaTMuf8Vh8TLsCBgHYkHIq9ah/tb4F9qsXZRmWDMseBuQo/aIPmmdvNVo8U7y/xaSzuI7mMZMZwydA6EjUn6DI8iBVq8z+0+3ijUWmLmV0DDqI01AEeIRvq3+Ab7bkVFPZ3yCbtFuLlikGxWNGw8gIVgWYfAhDDYe8c/drle0fl4WV4UjXTBKPEiHZd8Og/hbB+Tig3/ZdxGI8UZ7qNHluSxjlKABJSSxCL0XWCd+uVG/vGruu7iOJGkkdY0UZZ2YKoA7knYV838v8Dur19FqjMVYZlyUjjIIIJk7MNjgZb0rLzbxG9mneK9kLSQuVMXwxqR0ZEGxyCDqOSQaDa5rayn4oTbS+FbzuolmaM+GkjEhnQZBZGOMk4GSTnFXBy9yTZW0LxCMSmRSsskgDO4bqueir+VcD6718/uoIIO4NTPg3tGvILEQ6PEYN4cN24bw9IHwnbDyL0G/TGem4c3nzlL7FcJD4iNBMf2TySBSgJAxL3Crke/jGPXarE4Zxi44aqQ35Nxa4URX8allAI2WdQSVx0D75GOu5FQXk8krtJK7SyP8AE7nLH09AOwGw7VKeUeXOJXtlKkM/h2ocaYZCTHIyElgjYJVFOOnulh093NBdlldRyoJInWVG3DowZT8iKzV8523DDZ3iQ3jzWCkapHgfUxX3gpXw9XVh1I6A7VZHs0Ie7ne3vbq8tEhRSbhnP7VnLYUOoxpRR2+/8qCxKUpQKUpQKUpQRTmvhUwuYb62QSuiPFNHqVWkjPvLoLELqVt8EjOcVFeKwcNkc62fhlw251oYNR8ysg8OTf7wyfWrVrHcQo6lXVXU9VZQw/Q7UFRXHLV6o1RNDeJ2KP4Tn6HUh/qFc2b7RGR4lncoRuGWPxFBHfVGSAR2NWhc8kcOY6ltxC34oWeE/wD2ioP1FcTmHhkVjHr/ANJ3kedo4yY7h3P4Y0dCzH64HcigrqbjkCHDl0Pk0bg/7q8HmO2/zD/Q/wD5V05udOIKwjWSKaRnCrGYVLAM2F8RkYKGORsM1lu+b+IIW0mBwDjUkB3AOCVy+/fHnt51za9a95S0xXvvxjdzI+Ka/wB1DPN/BCxrftOG8Rmx4dmYgfvzsEA+afF/apHwC9a8YKOMiN/8n7FFDJ8h4jNq/lzUk/8AYoMf217eyjuvjLGh+YjRT/eukcxt3cjgiQcNtytzcRLI7vJI2dOWbGyKfeYBVA6Z2rHJK/E2jhiglWz8RGmnkTw0kjX3tEYYhn1kBc46E5qVcJ5SsLc6o7aMP18RwZHz565CTn613KPClKUClKUFbcB45DwqW8tLhyqRuXgUKSzRyENGqD7xGp18ho3wKhPPPN0t/JGzxosET60h+8/TIkkG41LkYXAGe+Aal/t54PmOG+UbxnwpT+RzlCfQPt/2lVarUH0vy5LA9tC9sqpA6K0aqoUAMM40joR3Hnmq99ufCIAiXgdI7gYTwyfemXPRVG5dM5z5Eg9qi/LHOd5ZWTRJDrjeRvAncN4aEgtIijH7Q5ywGcZLdcYqNX91LNI000jTSN1dzvjyAGyr6DAoJ17NeQoruNLu5kWSJvhgjfOcdpmG4I/APqe1WrfcItpIPs0kMZgwF8PSAgA6aQPhI7EYI7V8+ct8fuLKXxLd8A/vI23jkx+Idm/MN/ptUk519o011AkEUT2iSpmRmPvODkFYmwAY9vj6npgdwjnH7WzhvjHC8tzZow8TSyhtidUccn31Gw1bdxn71WefaXwyKzJgyrogWO1ZGjOTsq5xp0juQTgD5ZppfdGMeQAA3PYADuauH2dcmR2kMl3fKhkdCWWQKUhjA1EHVtqOMse2MeeQqe8upriZpGzNcTuNh952wqqo7KBgAdgKv3kbgC2VpHBkM5y8rj70jY1H5DAUeiio5yHwOCa5fiq26W8WClnGsYjyoyDO6gfE2SF8lPyNWBQKUpQKUpQKUr8ZgASTgDck9BjzoP2lQXjftLto30Qxtc46urBY/wCQkEv8wMeRNRrjfO1xfnwLdJYkY6RFHnx5tve1SD3Yoh0ODnzI6UEq5v58ih1w2+iWVch5GP7GI/nYfG/5F+pFVXecQluJGk1szsMPcuBrYfhjXpGnkB/zroczcA+z+DFOymYgyNEhxFFGCQq/ndmydR29w4G+a51uw06jsDlvkO3+yBVXUZ5r0r3avh+irl9d/b+nqzgWPJQYIyqt31OvvtnOcrGcZ85VPasoFACMKdioAYfmf35P0ZtHyiFKz89p32+n5buix1is3iNt+32+GK4tkcYZQfmK63BOZL+0wI5fFjH+FNl1x5K2da/rj0rUsrSWVzHEgdgjyEZwdKFQcds5YdcD5VrLKCQpyrEBgrAqxDDIYA9VI3BGxrvHbLSvKOyPNi0ua00vty/5K1+Uee4LtlidTbXB6Ixyr4/y32DH8pAPoal9fPFxCGG+xBBBGxBHQgjoR51Z3su5oe4VrW4bVPGupXPWSPOMnzZSQD56lPnV7BqIydPlha3QW088o61TmlKVZZxSlKDV4tYxzwyQSDUkilGHowxt5EdQfMVVXJHJltHcSxXgM00MmPDYYiaNgPClC/4gY6s5yARjGetv1H+cOBNOEnhIju4cmJj8Lqfihk842/VTgig6XHODw3Nu9s6jw2UAYwCmPhZPwlTgj/yr5/5o4HNZTeBMpJP7qRVOmQZABQD724ynUE+RBNkcS9pS28GgRs13uDC+V8JsnUJT3UdRj4h5DcVbxfiE11KZ7hzLIehJwqDssaj4APTfv1oJryFyGXdJ75SqAgpbEbsTnSZTnYZUr4fXJAbG6myOOixktXa8SM28YydajCjHu6Mbq2CF93fOQKpzhHPV7bRlGdZ4uoEufEU5LArIN8h8N72qsvPd/f3JV5bSa2tcB0TQ7pk5OqR1GMgs2FIGnJ2ySaDhRXoiu/tNongoj5gjl/a6RjAZtX3u466c9TjNWDy5xO942fAnVI7OJw1w8YdfGIwyQ+8TgZ3bHbHTbMJ5Q5fl4hN4UWVjXBlmxsgPZfNz2H1q/uCcLhtYEghTRGgwB3PmzHuxO5NBtRoAAAAAAAABgADYADsK90pQKUpQKUrHcTKis7sERQSzMQFAHUknYCgyVXfti4urRLZQyBpjIpmjU7CMKxxKw2jBYocHc46EGtbm7nt5f2VoXijY6RMqEzSk/dt48ZAP4yM77DvXrlL2fFgJLxdCE6hbBslid9VzJ1dj3QEjzJ6AKvaTJIBD7ke6cj5oxxkf+vSph7J+LWtrLM9yzJIE0o4V3TSzKzLpRSQ+UU5O2AMYycyLnT2dF5RLYiOLWG8SJmKRhgMh0CqcZ6FQAOh23zAr2yksz4c8MkJzuzj3WPmJB7jfQ1Hlvald6xus6XDTLfje3GHvmnjC3VxczKT77hUBBBCLhE2O4zgtj8xpDbh2iixs7xoR+VnAb/Zz+laE9yjvGqsrb5IBB6Ant6gV1+Ff/MQfxt/aKQj+4qhM8sld423ndvViMenvxneIjbeGskuoF+mss/8AWxf/AIq/aw2H7tP4F/8AxFZqqZZ3vLTwRtirEfSEj9nI/wCly46/ZLjHz1QVOOW+HW93wyyE8STL9niA1KCQVjVSVbqpyDuCKgns7m08QhH+YssfpvGZN/rGKmXsfuA1h4OTm3mmiIOcjDl1G++yuB9K1dLO+KHy3ikbam3+kQ585WFk0ckTM1vK2jS51NG+CyjV1ZGAI33BHU5rjcuXngX9pNkgawjfwy/sznzA1q38tWf7VJYRw6YSuEJwYs5y0iftEUY7nQR+tUre3sZAIdcgg4zv1B/tXF8fHLW1Y7rGnz+Zpb48lusdt30pSsNncpJGkqMHSRQyMM4IYZB38wazVcYxSlKBSlKCLc7clW98NZJinUYWZRkkdlkX/EX9COxFVBzFypfWZPiRNJGM4liBeMj1wMxn+IAV9EUzQVJ7K+B2JK3M88M06kFIlkRki8mcZyz+pGB23BIlfE+MzX7G24exSHcTXw+BRn3ktz/iSHf3xsvzII7fE+XLKc6pbWGVvxNGur+rGT8q6UMSooRFCKoAVVACgDoABsBQafAeEwWkKwQroRf1Y92Y/eY9zW/SlApSlApSlArj828E+2QGEuYyGV1bSHGpDkakOzr6ZHY5BFdilBHuVuVILQ+IT49www07jDfwxruI09Bv5k1IaUoFfjqCMEAg9QRkfpX7Sgrb2w2saCzKRomZJMlUVc/sz1wPnUJs5dE9u56LLHn5O2g/2erF9tNuTaQyjpFOhb+F1aM/7TLVZXcZZGUHBI2PkeoP64qhqOmWst7w6PM0uSkd+v4ebJSqKh6plD80JQ/7qzV5eYNI7DYS6ZgP+sGZB9JA4+leqp567ZJa+ivzwV+34dPlM4vrQ/65f7qwP9iakfs84nHbT8bDnTDFO8ucZOPElRgAOpyigee1cXkG38TiNt5RmSRvQJGy5/qdKy+zWAXk/EsgFLiFycjbM00joSPTOfpWhpOmOHz/AIttbPO3xEPzn/naG+t44oopUKy62MgiAwscijTpkOTlx+hqFSKz4RB77kKv8TEKvT8xFbnEOA3tu/hy20gb8SI7xkADAV0BBGMk9xg5qY+zLlKd547uaNoooyWjVxpeRhsraCMqgJ1ZOCSFxtVtlLWtIFjjSNdlRVVR6KAB/urLSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlBz+YeGrdW81u2wkRlz5Ej3W+hwfpVERqy6opBpljYxuPJk2J+R6g+tfQ9Vp7WuXiG/0jEucKFulUblV+GUDuVGx/LjyNV9Ri506d4X/D9V5GX1e2ekq3n8RMEYYBjp6g4fGU223bDeh1eZroVptIHddPvIuDkdCzDb9Ac/pXU4Zw+S5mS3j2eQ4LYzoUbu59FHTzJUd6o3i15rWe7fx3x4K3vE+n+/8O1y+TBw69vvheYC2tztnclXdf5if+4NSD2IcO0W01zjHjSaU/6uEFB/t66h3tI4okkkdlanEFsPCjxuC4GJHz3Cr7ufPX51Zfs+45bT28cMQ8J4UVGgJyyhQFBB++hx8X64O1aOOK19MfD53Pa94m8x3nf9Qk+aUpUqmUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgVzuZOJra20s7jIjQkL+Jj7qJ/MxC/WugzAdTiqx9rnFtcyWin3IgJJd+rsDoU/wrl8fmQ1xe0VrMylwYpy5IrHyglvHpGSMsTnCL1Zz0RV82OAo9BUu4hJ/ou1MeQOIXS5kYEf9Hi32U+ecgHuxZuigV44DFHZwDilyupjkWUB2LsR+8Oegx0P3Vy25KgZOR+WpOIyvf33vxOSQpBAlbGkHHVYUGyjuRntvBhxzHqt3n+Ghq9RWZjHX2V/mUK4ZD98jGwVV/Co6Z9T1/StwaldZI3aKRDlHU4YH5+XmDse9T/jHswXJa0uGi/1cg8RPkHyHH1LVF+J8p8St1Z3hSWNAWZ45FIAUZJKvpboPI1Dkw5Yvyqu4NdpbYvLvG33bsXtNvo3jV4opVVT4mCUaTfAZeoRh5bg79O1icq81Wt6p8F8SAe/E/uyL817j8wyK+f0u0Ys5Zfe2VdQyFHTI89yfrW3w6J/tEHhkrKZY1jdSQ4LMq7EdsE59M1dpy4xy7sLPw8yeHt+H0jSv01+V2iKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKjfHOdrG2kMMkjGRcaljjkk05GQGKjAON8ZzUkqt/arym7sb23Qu+AJ41GWYKMLIg+8wAwR1IAx03Dne0rnS2u7dLa2cuHcNNlHQqsZDKuGAOWfScjshqIcL4gFuRLdrJdRFtUgUgyOQAFD6iAye6MjIyAAds50FmBGRv610OXeDzXk/gQjfYyOR7kSn7z+Z64XqflkjyaxPd1W1q+2dkm5VtW43eSXN0cQQ6VEAyNm95Y+g9zbLN1Y+Qxi3o0AAAAAAAAAwABsAB2FaHLfBorOBYYgcDdmPxOx+J2Pmf0AAA2ArpV68mdylKUeIZ7XrNTwyVlRcq8RJCjOPFQHfHTfJ9BUX9kPL7Syi/kH7KPUsPX33OUZx5qo1KPNifw1a9xCjqyOodGBDKwBUgjBBB2IPlX7DEqKqIoVVACqoAUAdAAOgoPdKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoIxzNyNZ3bGQq0Ep+KSIhWb+MEFXPqRn1rscB4PBaxCKBAiDc92Ynqzsd2Y+ZrfpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQf//Z" ;
    let teamsNuevo = "Sin equipos";
    const jsonDataa = jsonData.drivers.map((driver) =>{
      return {
        id : driver.id,
        nombre : driver.name.forename,
        apellido : driver.name.surname,
        nombreCompleto : driver.name.forename + ' ' + driver.name.surname,
        descripcion : driver.description,
        imagen: driver.image.url ? driver.image.url : imgNueva,
        nacionalidad : driver.nationality,
        fechaNacimiento : driver.dob,
        createBBDD: false,
        teams: driver.teams ? driver.teams : teamsNuevo
      }
    })
    return jsonDataa;
  } catch (error) {
    console.error(error);
    throw new Error('Error reading JSON file');
  }
}


async function readBBDD (){
    try{
       let driver = await Driver.findAll(
        {
          include: 
            {
              model: Teams,
              as: 'Teams',
            },
            
        }

       );

       if(driver){
        driver = driver.map((d) =>{
          return {
               id: d.id,
               nombre: d.nombre,
               apellido : d.apellido,
               nombreCompleto : d.nombre + ' ' + d.apellido,
               descripcion: d.descripcion,
               nacionalidad : d.nacionalidad,
               fechaNacimiento: d.fechaNacimiento,
               createBBDD: d.createBBDD,
               teams: d.Teams.map((team) => {
                 return  team.nombre;
                 }).join(" , "),
   
        } });
   
        return driver;
       }

       else{
        return []
       }
      
    }catch(error){
            console.log("el error en readBBD fue " , error);
            throw new Error("Error e readBBDD");
    }
}


async function getAllDriver(){
    const driverApi = await readJsonFile();
    const driverBBDD = await readBBDD();
    const allDriver = [
        ...driverBBDD, // Agregar todos los objetos individuales de la base de datos
        ...driverApi // Agregar todos los objetos individuales del JSON
    ];
    return allDriver; 
}

async function getAllTeams() {
  const jsonFile = await readJsonFile();
  console.log("por aqui", jsonFile);

  if (!jsonFile || !Array.isArray(jsonFile)) {
      console.error("Datos incorrectos en el archivo JSON");
      return [];
  }

  const allTeams = jsonFile
      .flatMap(driver => driver.teams ? driver.teams.split(',') : [])
      .map(team => team.trim())
      .filter(team => team !== "");

  const uniqueTeams = [...new Set(allTeams)];

  console.log("Los equipos en la función son", uniqueTeams);
  return uniqueTeams;
}






module.exports = { app, readJsonFile , readBBDD , getAllDriver , getAllTeams};
