exports.run = async (client, message, args) => {
	const request = require('request-promise-native');
	const cheerio = require('cheerio');
	try {
		const comics = ['amazing super powers', 'cyanide and happiness', 'chainsawsuit', 'commitstrip', 'theodd1sout']
		if (!args.length) {
			args = [comics[Math.floor(Math.random()*comics.length)]];
		}
		let img = '',
			link = '',
			title = '',
			description = '',
			author = '';
		switch (args[0].toLowerCase()) {
			case 'asp':
			case 'amazing super powers': {
				const body = await request.get('http://www.amazingsuperpowers.com/?randomcomic&nocache=1');
				const $ = cheerio.load(body);
				img = $('#comic-1 img').attr('src');
				link = $('.post-title a').attr('href');
				title = $('.post-title a').text();
				description = $('.entry').text();
				author = 'AmazingSuperPowers';
				break;
			}
			case 'css':
			case 'chainsawsuit': {
				const body = await request.get('http://chainsawsuit.com/comic/random/?random&nocache=1');
				const $ = cheerio.load(body);
				img = $('#comic img').attr('src');
				link = $('link[rel="canonical"]').attr('href');
				title = $('.post-title').text();
				description = $('.entry p').text();
				author = 'chainsawsuit';
				break;
			}
			case 'cs':
			case 'commitstrip': {
				const body = await request.get('http://www.commitstrip.com/?random=1');
				const $ = cheerio.load(body);
				img = $('.entry-content img').attr('src');
				link = $('link[rel="canonical"]').attr('href');
				title = $('.entry-title').text();
				author = 'CommitStrip';
				break;
			}
			case 'to1o':
			case 'theodd1sout': {
				const body = await request.get('http://theodd1sout.com/?random&nocache=1');
				const $ = cheerio.load(body);
				img = $('#comic img').attr('src');
				link = $('link[rel="canonical"]').attr('href');
				title = $('.post-title').text();
				description = $('.entry p').text();
				author = 'theodd1sout';
				break;
			}
			case 'cah':
			case 'cyanide and happiness': {
				const body = await request.get('http://explosm.net/comics/random');
				const $ = cheerio.load(body);
				img = $('#main-comic').attr('src').replace(/^\/\//, 'http://');
				link = $('#permalink').attr('value');
				author = 'Cyanide and Happiness';
				break;
			}
			/*case 'xkcd': {
				const body = await request.get('http://explosm.net/comics/random');
				const $ = cheerio.load(body);
				img = $('#main-comic').attr('src').replace(/^\/\//, 'http://');
				link = $('#permalink').attr('value');
				author = 'Cyanide and Happiness';
				break;
			}*/
			default:
				return message.channel.send('I don\'t know this comic.');
		}
		return message.channel.send({embed: new client.methods.Embed()
			.setAuthor(author)
			.setTitle(title)
			.setURL(link)
			.setColor('DARK_RED')
			.setImage(img)
			.setDescription(description)
		});
	} catch(err) {
		client.emit('error', err);
	}
};

exports.conf = {
	nsfw: false,
	permLevel: 2,
	enabled: true,
	runIn: ['text'],
	aliases: [],
	botPerms: [],
};

exports.help = {
	name: 'comics',
	description: 'Posts random comics.',
	usage: '[comic:str]',
	usageDelim: '',
};

/*
!comics random
    Returns a random comic
!comics asp or amazing super powers
    Returns a Amazing Super Powers comic
!comics az or awkward zombie
    Returns a Awkward Zombie comic
!comics cah or cyanide and happiness
    Returns a Cyanide and Happimess comic
!comics css or chainsawsuit
    Returns a chainsawsuit comic
!comics dhd or dog house diaries
    Returns a Dog House Diaries comic
!comics smbc or saturday morning breakfast cereal
    Returns a Saturday Morning Breakfast Cereal comic
!comics to or the oatmeal
    Returns a The Oatmeal comic
!comics xkcd
    Returns a xkcd comic
	*/